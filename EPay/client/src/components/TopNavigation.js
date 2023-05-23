import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png';
import cartIcon from '../assets/cart.png';
import Css from './TopNavigation.module.css'

const TopNavigation = (props) => {
    const {user, cart} = props;

    return (
        <div className={Css.topNav}>
            <div className={Css.topLeft}>
                <h1>Hi, {user.firstName}!</h1>
                { user.myFile ?
                    <Link to='/'><img className={Css.profilepic} src={user.myFile} alt="avatar"/></Link>
                    : <Link to='/'><img className={Css.profilepic} src={avatar} alt="no-avatar"/></Link>
                }
            </div>
            <div className={Css.topRight}>
                <div className={Css.totalCart}>
                    <Link to='/cart'><button className={Css.cartButton}><img className={Css.cartPic} src={cartIcon} alt="cart"/><div className={Css.cartTotal}><h6>{cart.count}</h6></div></button></Link>
                </div>
                <Link to='/'><h4>dashboard</h4></Link>
                <Link to='/users/edit'><h4>edit profile</h4></Link>
                <Link to='/favorites'><h4>watchlist</h4></Link>
                <Link to='/logout'><h4>logout</h4></Link>
            </div>
        </div>
    )
}

export default TopNavigation