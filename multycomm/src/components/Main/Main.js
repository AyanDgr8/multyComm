// src/components/Main/Main.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';

import Login from '../routes/Home/Login/Login';
import Register from '../routes/Home/Register/Register';
import ForgotPassword from '../routes/Home/ForgotPassword/ForgotPassword';
import UpdatePassword from '../routes/Home/UpdatePassword/UpdatePassword';

export default function Main(){
    return (
    <>
        <Router>
            <div>
                <Routes>
                    <Route path="/user-login" element={<Login />} /> 
                    <Route path="/user-register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/update-password" element={<UpdatePassword />} />
                </Routes>
            </div>
        </Router>
    </>
    );
}    