function sendOTP() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const messageDiv = document.getElementById('message');
    
    // Reset the message div
    messageDiv.style.display = 'none';
    messageDiv.innerHTML = '';

    // Check if the phone number has exactly 10 digits
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
        displayMessage('ERROR: Please enter a valid 10-digit mobile number.', 'error');
        return;
    }

    // Simulate sending OTP (here we're using a fixed OTP of "123456")
    displayMessage('OTP sent successfully!', 'success');
    document.querySelector('.otp-group').style.display = 'block';
    document.getElementById('verifyOtpButton').style.display = 'block';
}

// Function to verify the OTP
function verifyOTP() {
    const enteredOTP = document.getElementById('otp').value;
    const phoneNumber = document.getElementById('phoneNumber').value;  // Get the phone number here
    const messageDiv = document.getElementById('message');
    
    // Reset the message div
    messageDiv.style.display = 'none';
    messageDiv.innerHTML = '';

    // Check if the entered OTP matches the hardcoded OTP "123456"
    if (enteredOTP === '123456') {
        displayMessage('OTP verified successfully!', 'success');

        // Save the phone number to localStorage
        localStorage.setItem("phoneNumber", phoneNumber);
        
        // Redirect to the registration page
        window.location.href = 'registration.html';  // Change to the actual registration page URL
        return false; // Prevent form submission as we're redirecting
    } else {
        displayMessage('ERROR: Invalid OTP. Please try again.', 'error');
        return false; // Prevent form submission
    }
}


// Function to display a message
function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;

    // Set class based on message type
    if (type === 'success') {
        messageDiv.className = 'message success';
    } else {
        messageDiv.className = 'message error';
    }
}
