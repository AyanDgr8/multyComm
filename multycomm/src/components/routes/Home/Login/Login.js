// src/components/routes/Landing/Login/Login.js

import React, { useState, useEffect } from 'react';
import './Login.css' ;
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
    
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        username:'',
        password: '',
    });

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation checks
        if (!validateForm()) return;
    
        // If validations pass, submit the form data
        const apiUrl = "https://multycomm-backend.onrender.com/user-login";
        try {
            // Submit the form data
            const response = await axios.post(apiUrl, formData); // Send formData directly
            console.log('Submission successful');
            setSubmitStatus('success');
            handleSubmissionSuccess(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            handleSubmissionError(error);
        }
    };


    // Function to validate form inputs
    const validateForm = () => {
        const { username,  password } = formData;
        // Check if any required field is empty
        if (!username || !password ) {
            alert('Please fill in all the required fields');
            return false;
        }
        // Validate password length
        if (password.length < 8) {
            alert('Please enter a password with a minimum length of 8 characters');
            return false;
        }

        // If all validations pass, return true
        return true;
    };

    

    // Function to handle successful form submission
    const handleSubmissionSuccess = (data) => {
        setSubmitStatus('success');
        // Redirect or perform other actions based on the response data
    };

    // Function to handle form submission error
    const handleSubmissionError = (error) => {
        console.log('Error object:', error);
        if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            console.log('Error message:', errorMessage);
            alert(errorMessage);
        } else {
            alert('An error occurred. Please try again later.');
        }
        setSubmitStatus('error');
    };


    const resetForm = () => {
        setFormData({
          username:'',
          password: '',
        });
    }; 

    useEffect(() => {
        if (submitStatus === 'success') {
            const resetFormTimeout = setTimeout(() => {
                setSubmitStatus(null);
                resetForm();
            }, 4000);
            return () => clearTimeout(resetFormTimeout);
        }
    }, [submitStatus]);
    

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

                {/* ******** */}
                <div class="row mb-4 mob">

                  <div class="col">
                      <div data-mdb-input-init class="form-outline">
                          <input type="text" id="form6Example3" class="form-control inputs" 
                              name="username" value={formData.username} onChange={handleChange}
                              placeholder='Username'  required 
                          />
                        </div>
                  </div>

                  <div class="col">
                    <div data-mdb-input-init class="form-outline">
                      <input type="text" id="form6Example6" class="form-control inputs" 
                        name="password" value={formData.password} onChange={handleChange}  
                        placeholder='Password' required 
                      />
                      </div>
                  </div>

                </div>


                
                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4 sbt-btn ">Submit</button>
                
                

                {/* ***************** */}


                <div>
                <h6 className="head2">Not a registered user?</h6>
                <Link to="/user-register" className="register-link">
                    Register
                </Link>

                </div>
              

            
                {submitStatus && (
                    <p className={submitStatus === 'success' ? 'success-message' : 'error-message'}>
                        {submitStatus && (
                        (() => {
                            if (submitStatus === 'success') {
                            window.alert('Successfully logged in!');
                            } else {
                            window.alert('Please try again!');
                            }
                        })()
                        )}

                    </p>
                )}


            </form>

        </div>
    )

};

export default Login;
