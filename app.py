from flask import Flask, request, jsonify
from flask_cors import CORS
from video_analyzer import VideoAnalyzer
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the video analyzer
analyzer = VideoAnalyzer()

@app.route('/api/analyze', methods=['POST'])
def analyze_video():
    try:
        data = request.json
        
        if 'youtube_url' in data:
            # Handle YouTube URL
            results = analyzer.analyze_video(data['youtube_url'], is_youtube=True)
        elif 'video' in request.files:
            # Handle uploaded video file
            video = request.files['video']
            temp_path = f"temp_{video.filename}"
            video.save(temp_path)
            
            try:
                results = analyzer.analyze_video(temp_path, is_youtube=False)
            finally:
                # Clean up temporary file
                if os.path.exists(temp_path):
                    os.remove(temp_path)
        else:
            return jsonify({'error': 'No video source provided'}), 400
            
        return jsonify({'results': results})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 