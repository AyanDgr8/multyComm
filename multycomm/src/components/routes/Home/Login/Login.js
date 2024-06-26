// src/components/routes/Landing/Login/Login.js

import React, { useState, useEffect } from 'react';
import './Login.css' ;
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => { 
    const [alertMessage, setAlertMessage] = useState(null);
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: '',
    });

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleResetPassword = async () => {
    //     try {
    //         await sendPasswordReset(formData.usernameOrEmail); // Assuming the user enters either username or email for password reset
    //         console.log('Password reset link sent successfully');
    //         setAlertMessage('Password reset link sent to your email!');
    //     } catch (error) {
    //         console.error('Error sending password reset link:', error);
    //         setAlertMessage('An error occurred while sending the password reset link. Please try again later.');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation checks
        if (!validateForm()) return;
        // Disable the submit button to prevent multiple submissions
        e.target.querySelector('button[type="submit"]').disabled = true;
        // If validations pass, submit the form data
        const apiUrl = "https://multycomm-backend.onrender.com/user-login";
        try {
            const response = await axios.post(apiUrl, formData); 
            console.log('Submission successful');
            handleSubmissionSuccess();
            setAlertMessage('Successfully logged in!');
            handleSubmissionSuccess(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            handleSubmissionError(error);
        }
    };

    // Function to validate form inputs
    const validateForm = () => {
        const { usernameOrEmail, password } = formData;
        if (!usernameOrEmail || !password ) {
            setAlertMessage('Please fill in all the required fields');
            return false;
        }
        if (password.length < 8) {
            setAlertMessage('Please enter a password with a minimum length of 8 characters');
            return false;
        }
        return true;
    };

    // Function to handle successful form submission
    const handleSubmissionSuccess = (data) => {
        // Redirect to desired URL after alert is dismissed
        setTimeout(() => {
            window.location.href = "https://testing.gamehigame.com/";
        }, 500); 
    };

    // Function to handle form submission error
    const handleSubmissionError = (error) => {
        if (error.response && error.response.data && error.response.data.message) {
            setAlertMessage(error.response.data.message);
        } else {
            setAlertMessage('An error occurred. Please try again later.');
        }
        // Reset the form
        resetForm();
    };

    // Function to reset the form
    const resetForm = () => {
        setFormData({
            usernameOrEmail: '',
            password: '',
        });
    };

    useEffect(() => {
        if (alertMessage) {
            // Show alert
            alert(alertMessage);
            // Clear alert message
            setAlertMessage(null);
        }
    }, [alertMessage]);
    

    
    return(
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

            <form onSubmit={handleSubmit} className='form-login'>
                
                <div className='form-heading'>
                    <h3 className='form-line1'>Login</h3>                 
                </div>

                <div className="row mb-4 mob">
                  <div className="col">
                      <div data-mdb-input-init className="form-outline">
                          <input 
                              type="text" 
                              id="form6Example3" 
                              className="form-control inputs" 
                              name="usernameOrEmail" 
                              value={formData.usernameOrEmail} 
                              onChange={handleChange}
                              placeholder='Username or Email' 
                              required 
                          />
                      </div>
                  </div>
                  <div className="col">
                      <div data-mdb-input-init className="form-outline">
                          <input 
                              type="text" 
                              id="form6Example6" 
                              className="form-control inputs" 
                              name="password" 
                              value={formData.password} 
                              onChange={handleChange}  
                              placeholder="Password" 
                              required 
                          />
                      </div>
                  </div>
                </div>
                
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4 sbt-btn ">Login</button>
                
                <div>
                    <Link  to="/forgot-password">
                        <button  className='reset-link'>Forgot Password</button>
                    </Link>
                </div>

                <div>
                    <h6 className="head2">Not a registered user?</h6>
                    <Link to="/user-register" className="register-link">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;  
