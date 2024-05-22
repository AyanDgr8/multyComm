// /src/components/routes/Home/ResetPassword/ResetPassword.js


import React, { useState } from "react";
import './ResetPassword.css'; 
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const {id, token} = useParams()

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword.trim()) {
      window.alert("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      window.alert('Please enter a password with a minimum length of 6 characters');
      return false;
    }

    // Prevent multiple submissions
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Send request to backend to update password
      // await axios.post('https://multycomm-backend.onrender.com/verify-otp', { email, otp, newPassword });


      const response = await axios.post(`https://multycomm-backend.onrender.com/reset-password/${id}/${token}`, { newPassword });

      if (response.data.Status === 'Success') {
        window.alert('Password updated successfully!');
        navigate('/user-login');
      } else {
        window.alert('An error occurred while updating your password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      window.alert('An error occurred while updating your password.');
    } finally {
      setIsSubmitting(false);
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
        <div className="reset-otp">
          <div className='form-heading'>
            <h3 className='form-line1'>Reset Your Password</h3>                 
          </div>
          <form onSubmit={handleSubmit}>
            <div className="reset_box">
              <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                className="reset-text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4 sbtt-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default ResetPassword;
