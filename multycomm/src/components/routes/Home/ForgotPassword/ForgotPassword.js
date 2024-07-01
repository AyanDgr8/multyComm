// /src/components/routes/Home/ForgotPassword/ForgotPassword.js


import React, { useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!email.trim()) {
            window.alert("Please fill in your email");
            return;
        }

        // Prevent multiple submissions
        if (isSending) return;

        try {
            // Start sending OTP process
            setIsSending(true);

            // Send OTP request
            const response = await axios.post('https://multycomm-backend.onrender.com/send-otp', { email });

            /// Check if the email exists and OTP sending was successful
            if (response.data.message === "Reset link sent successfully") {
                window.alert('Reset Link sent successfully. Please check your email.');
                // Redirect to login page after a delay
                setTimeout(() => navigate('/user-login'), 1000);
            } else {
                // Display error message if OTP sending failed
                window.alert('Failed to send link. Please try again.');
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            window.alert('The email address you entered is not associated with an account.');
        } finally {
            // Reset sending state
            setIsSending(false);
        }
    };

    return(
        <div>
            <section className='above-form'>
                <img 
                    src="/uploads/game-bg.webp"
                    className='game-bgg'
                    alt="game-bg"
                />
                <div className='form-header'>
                    <img 
                    src="/uploads/game-logo.webp"
                    className='game-logo'
                    alt="game-logo"
                    />
                    <img 
                    src="/uploads/game-head.webp"
                    className='game-head'
                    alt="game-head"
                    />
                </div>
            </section>
            <div className="change-otp">
                <div className='form-heading'>
                    <h3 className='form-line1'>Forgot Password</h3>                 
                </div>
                    <form onSubmit={handleSubmit}>
                        <div className="forgot_box">
                            <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="reset-textbox"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-4 sbtt-btn">
                            {isSending ? 'Sending...' : 'Send'}
                        </button>


                        <div>
                            <h6 className="head2">Not a registered user?</h6>
                            <Link to="/user-register" className="register-link">
                                Register
                            </Link>
                        </div>
                        
                    </form>
                </div>
            </div>
    )
}


export default ForgotPassword;
