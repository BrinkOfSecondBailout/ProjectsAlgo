import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Css from './Dashboard.module.css'
import AllItems from './AllItems';
import AllMyItems from './AllMyItems';
import avatar from '../assets/avatar.png';
import cart from '../assets/cart.png';
import AllSellers from './AllSellers';
import FilterItems from './FilterItems';

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
            <div className={Css.topNav}>
                <div className={Css.topLeft}>
                    <h1>Hi, <Link to='/users/edit/'>{user.firstName}!</Link></h1>
                    { user.myFile ?
                        <img className={Css.profilepic} src={user.myFile} alt="avatar"/>
                        : <img className={Css.profilepic} src={avatar} alt="no-avatar"/>
                    }
                </div>
                <div className={Css.topRight}>
                    <Link to='/cart'><button className={Css.cartButton}><img className={Css.cartPic} src={cart} alt="cart"/></button></Link>
                    <Link to='/favorites'>watchlist</Link>
                    <Link to='/logout'>logout</Link>
                </div>
            </div>
            <Link to='/items/new'>List a new item</Link>
            <h1>My Items</h1>
            <AllMyItems myItems={myItems}/>
            <FilterItems />
            <h1>Shop All Items</h1>
            <AllItems items={items}/>
            <h1>Browse By Sellers</h1>
            <AllSellers />
            
        </div>
    )
}

export default Dashboard