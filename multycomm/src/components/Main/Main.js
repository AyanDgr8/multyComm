// src/components/Main/Main.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';

import Login from '../routes/Home/Login/Login';
import Register from '../routes/Home/Register/Register';
import ForgotPassword from '../routes/Home/ForgotPassword/ForgotPassword';
import ResetPassword from '../routes/Home/ResetPassword/ResetPassword';


// import UpdatePassword from '../routes/Home/UpdatePassword/UpdatePassword';
// import OTPVerification from '../routes/Home/OTPVerificatio/OTPVerification';

export default function Main(){
    return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/user-login" element={<Login />} /> 
                    <Route path="/user-register" element={<Register />} />
                    <Route path="/send-otp" element={<ForgotPassword/>} />
                    <Route path="/reset-password/:id/:token" element={<ResetPassword/>} />
                </Routes>
            </div>
        </Router>
    </>
    );
}    