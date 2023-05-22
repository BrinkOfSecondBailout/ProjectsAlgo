import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Css from './Dashboard.module.css'
import AllItems from './AllItems';
import AllMyItems from './AllMyItems';
import avatar from '../assets/avatar.png';
import cartIcon from '../assets/cart.png';
import AllSellers from './AllSellers';
import FilterItems from './FilterItems';
import TopNavigation from './TopNavigation';

const Dashboard = (props) => {
    const {items, myItems} = props;
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/show/' + id)
            .then(response => {
                setCart(response.data);
            })
            .catch(err => console.log(err));
    }, []);



    return ( 
        <div>
            <div>
                {/* <div className={Css.topLeft}>
                    <h1>Hi, <Link to='/users/edit/'>{user.firstName}!</Link></h1>
                    { user.myFile ?
                        <img className={Css.profilepic} src={user.myFile} alt="avatar"/>
                        : <img className={Css.profilepic} src={avatar} alt="no-avatar"/>
                    }
                </div>
                <div className={Css.topRight}>
                    <Link to='/cart'><button className={Css.cartButton}><img className={Css.cartPic} src={cartIcon} alt="cart"/>{cart.count}</button></Link>
                    <Link to='/favorites'><h4>watchlist</h4></Link>
                    <Link to='/logout'><h4>logout</h4></Link>
                </div> */}
                <TopNavigation user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div className={Css.leftBody}>
                    <div className={Css.topLeftBody}>
                        <h1>My Items</h1>
                        <Link to='/items/new'>List a new item</Link>
                        <AllMyItems myItems={myItems}/>
                    </div>
                    <div className={Css.bottomLeftBody}>
                        <FilterItems />
                        <h1>Browse By Sellers</h1>
                        <AllSellers />
                    </div>
                </div>
                <div className={Css.rightBody}>
                    <h1>Shop All Items</h1>
                    <AllItems items={items}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard