// src/components/routes/Landing/LandingtForm/LandingForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LandingForm.css'; 

const LandingForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        state:'',
        zip:'',
        gender: 'men',
    });

    
  
    const [submitStatus, setSubmitStatus] = useState(null);

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validation checks
        if (!validateForm()) return;
    
        const apiUrl = "https://snyllo-payment.onrender.com/user-details-bookform";
    
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
        const { firstName, lastName, email, phone, address, state, zip, gender } = formData;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const zipRegex =  /^\d{6}$/;
        
        if (!firstName || !lastName || !phone || !email || !address || !state || !zip || !gender) {
        alert('Please fill in all the required fields');
        return false;
        }
    
        if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return false;
        }
    
        if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
        }
    
        if (!zipRegex.test(zip)) {
        alert('Please enter a valid pin code');
        return false;
        }
    
        return true;
    };

    
  
    // Function to handle successful form submission
    const handleSubmissionSuccess = () => {
        setSubmitStatus('success');
        resetForm();
    };
    
    // Function to handle form submission error
    const handleSubmissionError = (error) => {
        if (error.response && error.response.data && error.response.data.error &&
        (error.response.data.error.includes('duplicate key error') ||
            error.response.data.error.includes('duplicate key email'))) {
        window.alert('The phone number or email you entered is already in use. Please enter different information.');
        } else {
        window.alert('An error occurred. Please try again later.');
        }
        setSubmitStatus('error');    
    };

    
    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            state:'',
            zip:'',
            gender: 'men',
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
            <form onSubmit={handleSubmit} className='form-multycomm'>
                
                <div className='form-heading'>
                    <div className='form-line1'>
                        <h1>MultyComm Registration Form</h1>
                    </div>
                </div>

                {/* ****** */}

                <div class="row mb-4">
                    <div class="col">
                        <div data-mdb-input-init class="form-outline">
                            <input type="text" id="form6Example1" class="form-control" 
                                name="firstName" value={formData.firstName} onChange={handleChange}  required 
                            />
                            <label class="form-label" for="form6Example1">First name</label>
                        </div>
                    </div>
                    <div class="col">
                        <div data-mdb-input-init class="form-outline">
                            <input type="text" id="form6Example2" class="form-control" 
                                name="lastName" value={formData.lastName} onChange={handleChange} required
                            />
                            <label class="form-label" for="form6Example2">Last name</label>
                        </div>
                    </div>
                </div>


                {/* ***************** */}
                <div class="row mb-4">

                    <div class="col">
                        <div data-mdb-input-init class="form-outline">
                            <input type="number" id="form6Example3" class="form-control"     
                                name="phone" value={formData.phone} onChange={handleChange} required 
                            />
                            <label class="form-label" for="form6Example3">Phone</label>
                        </div>
                    </div>
                    <div class="col">
                        <div data-mdb-input-init class="form-outline">
                            <input type="email" id="form6Example4" class="form-control" 
                                name="email" value={formData.email} onChange={handleChange} required
                            />
                            <label class="form-label" for="form6Example4">Email</label>
                        </div>
                    </div>

                </div>

                {/* ************ */}
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="text" id="form6Example5" class="form-control"     
                        name="address" value={formData.address} onChange={handleChange}  required
                    />
                    <label class="form-label" for="form6Example5">Address</label>
                </div>
                
                {/* ********* */}

                <div class="row mb-4">
                    
                    <div class="col">
                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form6Example6" class="form-control" 
                                name="state" value={formData.state} onChange={handleChange}  required
                            />
                            <label class="form-label" for="form6Example6">State</label>
                        </div>
                    </div>

                    <div class="col">
                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="number" id="form6Example7" class="form-control" 
                                name="zip" value={formData.zip} onChange={handleChange}  required
                            />
                            <label class="form-label" for="form6Example7">Zip</label>
                        </div>
                    </div>

                </div> 

                {/********* */}
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="inlineRadio1"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">
                            Male
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="inlineRadio2"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">
                            Female
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="inlineRadio3"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio3">
                            Other
                        </label>
                    </div>
                </div>

                

                {/* ***************** */}


                <button data-mdb-ripple-init type="button" class="btn btn-primary btn-block mb-4 sbt-btn">Submit</button>


            </form>
            
            {submitStatus && (
              <p className={submitStatus === 'success' ? 'success-message' : 'error-message'}>
                {submitStatus && (
                  (() => {
                    if (submitStatus === 'success') {
                      window.alert('Thank you for contacting us, we will be in touch shortly!');
                    } else {
                      window.alert('Please try again!');
                    }
                  })()
                )}

              </p>
            )}

        </div>
    )

};

export default LandingForm;
