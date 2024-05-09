// /src/components/routes/Landing/Register/Register.js

import React, { useState, useEffect } from 'react';
import './Register.css'; 
import axios from 'axios';
import { Link } from "react-router-dom";


const Register = () => {
    
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        username:'',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validateForm()) return;

        // If validations pass, submit the form data
        const apiUrl = "https://multycomm-backend.onrender.com/user-register";
        try {
            // Prepare request data
            const requestData = {
                ...formData
            };

            // Submit the form data
            await axios.post(apiUrl, requestData);
            console.log('Submission successful');
            setSubmitStatus('success');
            handleSubmissionSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            handleSubmissionError(error);
        }
    };

    // Function to validate form inputs
    const validateForm = () => {
        const { username, firstName, lastName, email, password, phone } = formData;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if any required field is empty
        if (!username || !password || !firstName || !lastName || !phone || !email) {
            alert('Please fill in all the required fields');
            return false;
        }

        // Validate phone number
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return false;
        }

        // Validate email address
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
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
    const handleSubmissionSuccess = () => {
        setSubmitStatus('success');
        resetForm();
    };



    // *************

    // Function to handle form submission error
    

    const handleSubmissionError = (error) => {
        if (error.response && error.response.data && error.response.data.message) {
            window.alert(error.response.data.message);
        } else {
            window.alert('An error occurred. Please try again later.');
        }
        setSubmitStatus('error');
    };
    



    // **************
    


    const resetForm = () => {
        setFormData({
            username:'',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
    }; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

            <form 
                id="form_container"
                className='form-register'
                action="https://multycomm-backend.onrender.com/user-register"
                method="post" 
                onSubmit={handleSubmit} 
                encType="multipart/form-data"
            >
                
                <div className='form-heading'>
                    <h3 className='form-line1'>Registration</h3>                 
                </div>

                {/* ******** */}

                <div class="row mb-4 mob">

                  <div class="col">
                      <div data-mdb-input-init className="form-outline">
                          <input type="text" id="form6Example3" className="form-control inputs" 
                              name="username" value={formData.username} onChange={handleChange}
                              placeholder='Username'  required 
                          />
                          {/* <label class="form-label" for="form6Example3">Username</label> */}
                      </div>
                  </div>

                  

                  <div class="col">
                    <div data-mdb-input-init className="form-outline">
                      <input type="text" id="form6Example6" className="form-control inputs" 
                        name="password" value={formData.password} onChange={handleChange}  
                        placeholder='Password' required 
                      />
                      {/* <label class="form-label" for="form6Example6">Password</label> */}
                    </div>
                  </div>

                </div>

                {/* ************ */}
            

                <div class="row mb-4 mob">
                    <div class="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id="form6Example1" className="form-control inputs" 
                                name="firstName" value={formData.firstName} onChange={handleChange}  
                                placeholder='First Name' required 
                            />
                            {/* <label class="form-label" for="form6Example1">First name</label> */}
                        </div>
                    </div>
                    <div class="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id="form6Example2" className="form-control inputs" 
                                name="lastName" value={formData.lastName} onChange={handleChange} 
                                placeholder='Last Name' required
                            />
                            {/* <label class="form-label" for="form6Example2">Last name</label> */}
                        </div>
                    </div>
                </div>


                {/* ***************** */}

                <div class="row mb-4 mob">

                  <div class="col">
                    <div data-mdb-input-init className="form-outline">
                      <input type="email" id="form6Example5" className="form-control inputs" 
                        name="email" value={formData.email} onChange={handleChange}
                        placeholder='Email' required
                      />
                      {/* <label class="form-label" for="form6Example5">Email</label> */}
                    </div>
                  </div>
                  

                  <div class="col">
                    <div data-mdb-input-init className="form-outline">
                        <input type="number" id="form6Example4" className="form-control inputs"     
                            name="phone" value={formData.phone} onChange={handleChange}
                            placeholder='Phone' required 
                        />
                        {/* <label class="form-label" for="form6Example4">Phone</label> */}
                    </div>
                  </div>

                </div>

                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4 sbt-btn ">Submit</button>
                
                

                {/* ***************** */}


                <div>
                <h6 className="head2">Already have an account?</h6>
                <Link to="/user-login" className="login-link">
                    Login
                </Link>

                </div>
              

            
                {submitStatus && (
                    <p className={submitStatus === 'success' ? 'success-message' : 'error-message'}>
                        {submitStatus && (
                        (() => {
                            if (submitStatus === 'success') {
                            window.alert('Thank you for registering!');
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

export default Register;
