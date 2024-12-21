import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Auth/Register';
import HospitalLocator from './components/HospitalLocator';
import HealthRecords from './components/HealthRecords';
import Appointments from './components/Appointments';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/hospitals" element={<HospitalLocator />} />
                    <Route path="/health-records" element={<HealthRecords />} />
                    <Route path="/appointments" element={<Appointments />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 