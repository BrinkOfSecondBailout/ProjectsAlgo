import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Css from './Dashboard.module.css'
import AllItems from './AllItems';

const Dashboard = (props) => {
    const {items} = props;
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    return ( 
        <div>
            <h1>Hi, <Link to='/users/edit/'>{user.firstName}!</Link></h1>
            <img className={Css.profilepic} src={user.myFile}/>
            <Link to='/logout'>logout</Link>
            <h1>All Listed Items</h1>
            <AllItems items={items}/>
            <Link to='/items/new'>List a new item</Link>
        </div>
    )
}

export default Dashboard