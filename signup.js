function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        channelUrl: document.getElementById('channelUrl').value
    };
    
    // Send email using EmailJS
    emailjs.send(
        'service_qg24kff',
        'template_41nmkbj',
        {
            to_email: 'm.imraan95@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            channel_url: formData.channelUrl,
            message: `New signup from ${formData.name}\nEmail: ${formData.email}\nChannel: ${formData.channelUrl}`
        }
    ).then(
        function(response) {
            console.log('Email sent successfully:', response);
            // Show success modal
            document.getElementById('successModal').classList.add('show');
            // Reset form
            document.getElementById('signupForm').reset();
        },
        function(error) {
            console.error('Email send failed:', error);
            alert('There was an error submitting your application. Please try again.');
        }
    );
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    // Redirect to home page after closing modal
    window.location.href = 'index.html';
} 