import React from 'react'
import { useNavigate , Link} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
            <Link to='/logout'>logout</Link>
        </div>
    )
}

export default Dashboard