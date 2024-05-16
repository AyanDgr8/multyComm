// // src/components/routes/Landing/Login/OTPVerification.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const OTPVerification = ({ email, phone }) => {
//     const [otp, setOTP] = useState('');
//     const [submitStatus, setSubmitStatus] = useState(null);
//     const navigate = useNavigate(); 

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const apiUrl = 'https://multycomm-backend.onrender.com/verify-otp';

//         try {
//             const response = await axios.post(apiUrl, { otp });
//             console.log('OTP verification successful');
//             setSubmitStatus('success');
//             navigate('https://testing.gamehigame.com/'); 
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//             setSubmitStatus('error');
//         }
//     };

//     return (
//         <div>
//             <h2>Enter OTP</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="otp">OTP:</label>
//                     <input
//                         type="text"
//                         id="otp"
//                         value={otp}
//                         onChange={(e) => setOTP(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default OTPVerification;
