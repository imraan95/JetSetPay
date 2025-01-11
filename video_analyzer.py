import torch
from transformers import AutoImageProcessor, AutoModelForObjectDetection
from pytube import YouTube
import cv2
import numpy as np
from PIL import Image
import tempfile
import os

class VideoAnalyzer:
    def __init__(self):
        # Initialize the model and processor
        self.processor = AutoImageProcessor.from_pretrained("microsoft/resnet-50")
        self.model = AutoModelForObjectDetection.from_pretrained("facebook/detr-resnet-50")
        
    def download_youtube_video(self, url):
        try:
            yt = YouTube(url)
            # Download lowest resolution to save bandwidth
            stream = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').first()
            temp_dir = tempfile.mkdtemp()
            video_path = stream.download(output_path=temp_dir)
            return video_path
        except Exception as e:
            raise Exception(f"Error downloading YouTube video: {str(e)}")

    def extract_frames(self, video_path, interval=30):
        frames = []
        timestamps = []
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frame_count = 0
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            if frame_count % (fps * interval) == 0:  # Extract frame every 'interval' seconds
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                pil_image = Image.fromarray(rgb_frame)
                frames.append(pil_image)
                timestamps.append(frame_count / fps)
                
            frame_count += 1
            
        cap.release()
        return frames, timestamps

    def analyze_frame(self, image):
        inputs = self.processor(images=image, return_tensors="pt")
        outputs = self.model(**inputs)
        
        # Convert outputs to COCO-format
        target_sizes = torch.tensor([image.size[::-1]])
        results = self.processor.post_process_object_detection(outputs, target_sizes=target_sizes)[0]
        
        detected_objects = []
        for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
            if score > 0.7:  # Confidence threshold
                detected_objects.append({
                    "label": self.model.config.id2label[label.item()],
                    "confidence": round(score.item() * 100, 2)
                })
        
        return detected_objects

    def analyze_video(self, source, is_youtube=False):
        try:
            video_path = self.download_youtube_video(source) if is_youtube else source
            frames, timestamps = self.extract_frames(video_path)
            
            results = []
            for frame, timestamp in zip(frames, timestamps):
                detected_objects = self.analyze_frame(frame)
                if detected_objects:
                    results.append({
                        "timestamp": self._format_timestamp(timestamp),
                        "detected_objects": detected_objects
                    })
            
            # Clean up temporary files if it's a YouTube video
            if is_youtube:
                os.remove(video_path)
                os.rmdir(os.path.dirname(video_path))
                
            return self._aggregate_results(results)
            
        except Exception as e:
            raise Exception(f"Error analyzing video: {str(e)}")

    def _format_timestamp(self, seconds):
        minutes = int(seconds // 60)
        remaining_seconds = int(seconds % 60)
        return f"{minutes}:{remaining_seconds:02d}"

    def _aggregate_results(self, results):
        # Aggregate similar objects and their timestamps
        aggregated = {}
        
        for result in results:
            for obj in result["detected_objects"]:
                label = obj["label"]
                if label not in aggregated:
                    aggregated[label] = {
                        "name": label,
                        "timestamps": [result["timestamp"]],
                        "confidence": [obj["confidence"]],
                        "category": self._categorize_object(label)
                    }
                else:
                    aggregated[label]["timestamps"].append(result["timestamp"])
                    aggregated[label]["confidence"].append(obj["confidence"])
        
        # Format the final results
        final_results = []
        for label, data in aggregated.items():
            final_results.append({
                "name": data["name"],
                "timestamp": data["timestamps"][0],  # Use first appearance
                "confidence": round(sum(data["confidence"]) / len(data["confidence"]), 2),
                "category": data["category"]
            })
            
        return final_results

    def _categorize_object(self, label):
        # Basic categorization of detected objects
        categories = {
            "travel_gear": ["backpack", "suitcase", "handbag", "umbrella"],
            "electronics": ["laptop", "cell phone", "camera", "tv"],
            "clothing": ["shirt", "dress", "tie", "shoes"],
            "accessories": ["watch", "necklace", "earrings", "sunglasses"],
            "sports": ["sports ball", "baseball bat", "tennis racket", "skis"]
        }
        
        for category, items in categories.items():
            if any(item in label.lower() for item in items):
                return category
                
        return "other" 