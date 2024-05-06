// src/components/Main/Main.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';
import LandingForm from '../routes/Landing/LandingForm/LandingForm';


export default function Main(){
    return (
    <>
        <Router>
            <div>
                <Routes>
                <Route path="/" element={<LandingForm />} />
                </Routes>
            </div>
        </Router>
    </>
    );
}    