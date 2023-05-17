import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Css from '../components/Cart.module.css'

const Cart = (props) => {
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const {items} = cart;
    const id = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/show/' + id)
            .then(response => {
                console.log(response.data)
                setCart(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Link to='/'>Back to dashboard</Link>
            { items?.map((item, index) => {
                return (
                    <div key={index}>
                        <h3>{item.item.name}</h3>
                        <h3>${item.item.price}</h3>
                        <h3>{item.quantity}</h3>
                        { item.item.myFile1 ?
                            <img className={Css.itemPicture} src={item.item.myFile1} alt="item-pic"/>
                        : null
                        }
                    </div>
                )
            })

            }
        </div>
    )
}

export default Cart