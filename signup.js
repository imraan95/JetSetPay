function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        channelUrl: document.getElementById('channelUrl').value
    };
    
    // Here you would typically send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success modal
    document.getElementById('successModal').classList.add('show');
    
    // Reset form
    document.getElementById('signupForm').reset();
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
    // Redirect to home page after closing modal
    window.location.href = 'index.html';
} 