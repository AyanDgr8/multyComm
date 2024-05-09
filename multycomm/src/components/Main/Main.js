// src/components/Main/Main.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';
// import LandingForm from '../routes/Landing/LandingForm/LandingForm';
import Login from '../routes/Home/Login/Login';
import Register from '../routes/Home/Register/Register';


export default function Main(){
    return (
    <>
        <Router>
            <div>
                <Routes>
                {/* <Route path="/" element={<LandingForm />} /> */}
                <Route path="/user-login" element={<Login />} /> 
                <Route path="/user-register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    </>
    );
}    