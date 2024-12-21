import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        hospitalId: '',
        date: '',
        time: '',
        type: ''
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get('/api/appointments');
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/appointments', newAppointment);
            fetchAppointments();
            setNewAppointment({ hospitalId: '', date: '', time: '', type: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="appointments-container">
            <h2>My Appointments</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
            </form>
            <div className="appointments-list">
                {appointments.map(appointment => (
                    <div key={appointment._id} className="appointment-card">
                        <h3>{appointment.type}</h3>
                        <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                        <p>Time: {appointment.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments; 