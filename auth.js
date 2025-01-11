// Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        // Redirect to dashboard or home page
        window.location.href = 'dashboard.html';
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

// Handle Sign Up
async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const channelUrl = document.getElementById('channelUrl')?.value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // Create user
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Update profile
        await userCredential.user.updateProfile({
            displayName: name
        });
        
        // Store additional user data
        // Here you would typically store the channelUrl in your database
        
        // Send verification email
        await userCredential.user.sendEmailVerification();
        
        // Show success message
        document.getElementById('successModal').classList.add('show');
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

// Handle Forgot Password
async function forgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (!email) {
        errorMessage.textContent = 'Please enter your email address';
        errorMessage.style.display = 'block';
        return;
    }
    
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Password reset email sent! Check your inbox.');
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is signed out
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
    }
}); 