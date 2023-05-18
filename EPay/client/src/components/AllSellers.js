import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Css from '../components/AllSellers.module.css'
import avatar from '../assets/avatar.png';

const AllSellers = () => {
    const [users, setUsers] = useState([]);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    })

    return (
        <div className={Css.flex}>
            { users.filter(user => user._id !== userId).map((user, index) => {
                return (
                    <div key={index}>
                        <Link to={`/users/${user._id}`}><h3>{user.firstName} {user.lastName}</h3></Link>
                        { user.myFile ?
                            <img className={Css.profilepic} src={user.myFile} alt="avatar"/>
                            : <img className={Css.profilepic} src={avatar} alt="no-avatar"/>
                        }
                    </div>
                )
            })

            }
        </div>
    )
}

export default AllSellers