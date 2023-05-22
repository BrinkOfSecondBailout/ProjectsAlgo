import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png';
import cartIcon from '../assets/cart.png';
import Css from './Dashboard.module.css'

const TopNavigation = (props) => {
    const {user, cart} = props;

    return (
        <div className={Css.topNav}>
            <div className={Css.topLeft}>
                <h1>Hi, <Link to='/users/edit/'>{user.firstName}!</Link></h1>
                { user.myFile ?
                    <img className={Css.profilepic} src={user.myFile} alt="avatar"/>
                    : <img className={Css.profilepic} src={avatar} alt="no-avatar"/>
                }
            </div>
            <div className={Css.topRight}>
                <Link to='/cart'><button className={Css.cartButton}><img className={Css.cartPic} src={cartIcon} alt="cart"/>{cart.count}</button></Link>
                <Link to='/'><h4>dashboard</h4></Link>
                <Link to='/favorites'><h4>watchlist</h4></Link>
                <Link to='/logout'><h4>logout</h4></Link>
            </div>
        </div>
    )
}

export default TopNavigation