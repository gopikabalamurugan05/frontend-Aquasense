function Password() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const messageDiv = document.getElementById('message');
    
    messageDiv.style.display = 'none';
    messageDiv.innerHTML = '';

    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
        displayMessage('ERROR: Please enter a valid 10-digit mobile number.', 'error');
        return;
    }

    displayMessage('OTP sent successfully!', 'success');
    document.querySelector('.otp-group').style.display = 'block';
    document.getElementById('verifyOtpButton').style.display = 'block';
}

function verifyPassword() {
    const enteredOTP = document.getElementById('otp').value;
    const phoneNumber = document.getElementById('phoneNumber').value;  
    const messageDiv = document.getElementById('message');
    
    messageDiv.style.display = 'none';
    messageDiv.innerHTML = '';

    if (enteredOTP === '1234') {
        displayMessage('OTP verified successfully!', 'success');
        localStorage.setItem("phoneNumber", phoneNumber);
        
        window.location.href = 'registration.html'; 
        return false;
    } else {
        displayMessage('ERROR: Invalid OTP. Please try again.', 'error');
        return false; 
    }
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;

    if (type === 'success') {
        messageDiv.className = 'message success';
    } else {
        messageDiv.className = 'message error';
    }
}
