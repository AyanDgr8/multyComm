// src/components/routes/Home/ForgotPassword/ForgotPassword.js

import React, { useState } from "react";
import './ForgotPassword.css'; 
import axios from "axios";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../../../../Firebase"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false); // State to track reset link sending process

  const handleResetPassword = async () => {
    if (!email.trim()) {
      window.alert("Please fill in your email");
      return;
    }

    // Prevent multiple submission
    if (isSending) return;

    try {
      // Start the reset link sending process
      setIsSending(true);

      // Check if the entered email exists in the database
      const response = await axios.post('https://multycomm-backend.onrender.com/forgot-password', { email });
  
      if (response.data.exists) {
        // If the email exists, send the password reset email
        await sendPasswordReset(email);
        window.alert("Password reset email sent successfully!");

        // Clear the email field
        setEmail('');
      } else {
        // If the email does not exist, display an error message
        window.alert("Email not found. Please enter a registered email.");
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
      window.alert(error.message);
    } finally {
      // End the reset link sending process
      setIsSending(false);
    }
  };
  

  return (
    <div>
      <section className='above-form'>
        <img 
          src="/uploads/game-bg.png"
          className='game-bg'
          alt="game-bg"
        />
        <div className='form-header'>
          <img 
          src="/uploads/game-logo.png"
          className='game-logo'
          alt="game-logo"
          />
          <img 
          src="/uploads/game-head.png"
          className='game-head'
          alt="game-head"
          />
        </div>
      </section>
      <div className="login-otp">
        <div className='form-heading'>
          <h3 className='form-line1'>Reset Password</h3>                 
        </div>
        <div className="login_box">
          <div>
            <input
              type="text"
              className="reset__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </div>
          
          <button 
            onClick={handleResetPassword} 
            data-mdb-ripple-init 
            type="submit" 
            className="btn btn-primary btn-block mb-4 sbtt-btn"
            disabled={isSending} // Disable button while sending
          >
            {isSending ? 'Sending...' : 'Send OTP'}
          </button>
          
          <div>
            Already a user?<Link to="/user-login" className="registerr-link">Login</Link> 
          </div>
          <div>
            Don't have an account? <Link to="/user-register" className="registerr-link">Register</Link> 
          </div>
        </div>
      </div>

    </div>
  );
}

export default ForgotPassword;
