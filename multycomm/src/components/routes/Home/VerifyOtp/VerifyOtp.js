// src/components/routes/Home/VerifyOtp/VerifyOtp.js

import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = ({ email, phone }) => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://multycomm-backend.onrender.com/verify-otp', { email, phone, otp });
      // Handle successful verification
      setMessage(response.data.message);
    } catch (error) {
      // Handle error
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          OTP:
          <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
        </label>
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
