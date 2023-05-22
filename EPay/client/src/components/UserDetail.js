import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/UserDetail.module.css'
import TopNavigation from './TopNavigation';
import avatar from '../assets/avatar.png';

const UserDetail = (props) => {
    const {user1, cart} = props;
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
            <div>
                <TopNavigation user={user1} cart={cart}/>
            </div>
            <div>
                <h1>{user.firstName} {user.lastName}</h1>
                { user.myFile ?
                    <img className={Css.profilePic} src={user.myFile} alt="avatar"/>
                    : <img className={Css.profilePic} src={avatar} alt="no-avatar"/>
                }

                <h2>Listed Items</h2>
                <div className={Css.flex}>
                    { items.map((item, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/items/${item._id}`}><h3>{item.name} ${item.price}</h3></Link>
                                { item.myFile1 ?
                                    <img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/>
                                : null
                                }
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDetail