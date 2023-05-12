import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Css from './Dashboard.module.css'

const Dashboard = (props) => {

    const {user} = props;

    return ( 
        <div>
            <h1>Hi, <Link to='/users/edit/'>{user.firstName}!</Link></h1>
            <img className={Css.profilepic} src={user.myFile}/>
            <Link to='/logout'>logout</Link>
            <h1>Your Listed Items</h1>
            <Link to='/items/new'>List a new item</Link>
        </div>
    )
}

export default Dashboard