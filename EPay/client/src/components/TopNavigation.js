import React from 'react'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.png';
import cartIcon from '../assets/cart.png';
import Css from './TopNavigation.module.css'
import saleIcon from '../assets/sale.png';

const TopNavigation = (props) => {
    const {user, cart} = props;

    return (
        <div className={Css.topNav}>
            <div className={Css.topLeft}>
                <div className={Css.wholeLogo}><img className={Css.saleIcon} src={saleIcon} /><h1 className={Css.logo}>ShopStop</h1></div>
                { user.myFile ?
                    <Link to='/'><img className={Css.profilepic} src={user.myFile} alt="avatar"/></Link>
                    : <Link to='/'><img className={Css.profilepic} src={avatar} alt="no-avatar"/></Link>
                }
                <h4><Link to='/users/edit'>{user.firstName} {user.lastName}</Link></h4>
            </div>
            <div className={Css.topRight}>
                <div className={Css.totalCart}>
                    <Link to='/cart'><button className={Css.cartButton}><img className={Css.cartPic} src={cartIcon} alt="cart"/><div className={Css.cartTotal}><h6>{cart.count}</h6></div></button></Link>
                </div>
                <div className={Css.navLinks}>
                    <Link to={`/inbox/${user._id}`}><h4>inbox</h4></Link>
                    <Link to='/'><h4>dashboard</h4></Link>
                    <Link to='/users/edit'><h4>edit profile</h4></Link>
                    <Link to='/favorites'><h4>watchlist</h4></Link>
                    <Link to='/logout'><h4>logout</h4></Link>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation