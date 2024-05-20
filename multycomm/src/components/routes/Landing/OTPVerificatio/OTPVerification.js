// // /src/components/routes/Home/OTPVerification/OTPVerification.js


// import React, { useState } from 'react';
// import './OTPVerification.css';
// import axios from 'axios';
// import { useLocation, useNavigate } from "react-router-dom";

// const OTPVerification = () => {
//     const [otp, setOtp] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { email } = location.state || {};

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate OTP and new password
//         if (newPassword.length < 6) {
//             window.alert('Please enter a password with a minimum length of 6 characters');
//             return;
//         }

//         // Verify OTP and set new password
//         const apiUrl = "https://multycomm-backend.onrender.com/verify-otp";
//         try {
//             await axios.post(apiUrl, { email, otp, newPassword });
//             window.alert('Password reset successfully!');
//             // Redirect to login page
//             setTimeout(() => {
//                 navigate("/user-login");
//             }, 500);
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             window.alert('An error occurred. Please try again later.');
//         }
//     };

//     return (
//         <div className="otp-verification-container">
//             <form onSubmit={handleSubmit} className="form-otp-verification">
//                 <h3 className="form-heading">OTP Verification</h3>
//                 <div className="form-group">
//                     <label htmlFor="otp">OTP</label>
//                     <input
//                         type="text"
//                         id="otp"
//                         className="form-control"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="newPassword">New Password</label>
//                     <input
//                         type="password"
//                         id="newPassword"
//                         className="form-control"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Verify OTP & Set Password</button>
//             </form>
//         </div>
//     );
// };

// export default OTPVerification;
