import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Css from './Dashboard.module.css'
import AllItems from './AllItems';
import AllMyItems from './AllMyItems';
import avatar from '../assets/avatar.png';

const Dashboard = (props) => {
    const {items, myItems} = props;
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
            { user.myFile ?
                <img className={Css.profilepic} src={user.myFile} alt="avatar"/>
                : <img className={Css.profilepic} src={avatar} alt="no-avatar"/>
            }
            <Link to='/logout'>logout</Link>
            <Link to='/cart'>Cart</Link>
            <Link to='/items/new'>List a new item</Link>
            <h1>My Items</h1>
            <AllMyItems myItems={myItems}/>
            <h1>Shop All Items</h1>
            <AllItems items={items}/>
            
        </div>
    )
}

export default Dashboard