import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/AllItem.module.css'

const UserDetail = (props) => {
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/show/' + id)
            .then(response => {
                setItems(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <h2>Listed Items</h2>
            <div>
                { items.map((item, index) => {
                return (
                    <h3 key={index}>
                        <Link to={`/items/${item._id}`}>{item.name} ${item.price}</Link>
                        { item.myFile1 ?
                            <img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/>
                        : null
                        }
                    </h3>
                )
            })
            }
            </div>
            <Link to='/'>Back to dashboard</Link>
        </div>
    )
}

export default UserDetail