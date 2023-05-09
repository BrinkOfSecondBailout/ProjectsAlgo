import React from 'react'
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{userId}</h2>
        </div>
    )
}

export default Dashboard