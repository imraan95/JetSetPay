// Test credentials for demo
const TEST_EMAIL = 'm.imraan95@gmail.com';
const TEST_PASSWORD = 'test';

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // For demo purposes, only allow test credentials
        if (email === TEST_EMAIL && password === TEST_PASSWORD) {
            // Create a custom user object
            const user = {
                displayName: 'Imraan',
                email: TEST_EMAIL
            };
            sessionStorage.setItem('demoUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            throw new Error('Invalid credentials. Please use the test account.');
        }
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

// Handle Sign Up
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const channelUrl = document.getElementById('channelUrl')?.value;
    
    // For demo, just show the success message
    document.getElementById('successModal').classList.add('show');
    document.getElementById('signupForm').reset();
}

// Handle Forgot Password
function forgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (!email) {
        errorMessage.textContent = 'Please enter your email address';
        errorMessage.style.display = 'block';
        return;
    }
    
    alert('For demo purposes, please use the test account:\nEmail: m.imraan95@gmail.com\nPassword: test');
}

// Check auth state
function checkAuth() {
    const user = JSON.parse(sessionStorage.getItem('demoUser'));
    if (user) {
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'dashboard.html';
        }
        return user;
    } else {
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }
}

// Handle logout
function handleLogout() {
    sessionStorage.removeItem('demoUser');
    window.location.href = 'index.html';
}

// Initialize auth check
checkAuth(); 