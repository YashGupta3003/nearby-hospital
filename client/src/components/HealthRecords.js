import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/health-records`, {
                    headers: { 'x-auth-token': token }
                });
                setRecords(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Health Records</h2>
            {records.length === 0 ? (
                <p>No health records found.</p>
            ) : (
                <div>
                    {records.map(record => (
                        <div key={record.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                            <h3>{record.type}</h3>
                            <p>Date: {new Date(record.date).toLocaleDateString()}</p>
                            <p>Provider: {record.provider.name}</p>
                            <div>
                                <strong>Details:</strong>
                                <pre>{JSON.stringify(record.data, null, 2)}</pre>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HealthRecords; 