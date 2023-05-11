import React , {useState, useEffect} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, [])

    return ( 
        <div>
            <h1>Hi, {user.firstName}</h1>
            <Link to='/logout'>logout</Link>
        </div>
    )
}

export default Dashboard