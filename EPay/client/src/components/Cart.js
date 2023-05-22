import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Css from '../components/Cart.module.css'
import TopNavigation from './TopNavigation';

const Cart = (props) => {
    const {user} = props;
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const {items} = cart || {};
    const id = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/show/' + id)
            .then(response => {
                setCart(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    useEffect(() => {
        calculateTotal(items);
    }, [items]);


    const calculateTotal = (items) => {
        if (!items) {
            return 0;
        }
        let total = 0
        for (let i = 0; i<items.length; i++) {
            let productTotal = items[i].item.price * items[i].quantity
            total += productTotal;
        }
        setTotal(total)
        return total;
    }

    const quantityChange = async (item, itemId, newQuantity, direction) => {
        try {
            axios.patch('http://localhost:8000/api/cart/update/' + id, {
                item: item,
                itemId: itemId,
                quantity: newQuantity,
                direction: direction
            })
            console.log('Quantity successfully updated')
            calculateTotal(items);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFromCart = async (cartId, itemId) => {
        try {
            axios.delete(`http://localhost:8000/api/cart/removeItem/${id}/${cartId}/${itemId}`)
                .then(response => {
                    console.log('Successfully removed item')
                })
        } catch (error) {
            console.log(error)
        }
    }

    const decreaseQuantity = (item, cartId, itemQuantity) => {
        const itemId = item._id
        console.log(itemId)
        console.log(cartId)
        if (itemQuantity === 1) {
            deleteFromCart(cartId, itemId);
        } else {
            const newQuantity = itemQuantity - 1;
            quantityChange(item, cartId, newQuantity, "down");
        }
    };

    const increaseQuantity = (item, itemId, itemQuantity) => {
        const newQuantity = itemQuantity + 1;
        quantityChange(item, itemId, newQuantity, "up");
    };


    return (
        <div>
            <div>
                <TopNavigation user={user} cart={cart}/>
            </div>
            <div>
                { items?.map((item, index) => {
                    return (
                        <div key={index}>
                            <h3>{item.item.name}</h3>
                            <h3>${item.item.price}</h3>
                            <form>
                                <label><h4>Quantity:</h4></label>
                                <button onClick={() => decreaseQuantity(item.item, item._id, item.quantity)}>-</button>
                                <input className={Css.smallInput} type="text" value={item.quantity} readOnly/>
                                <button onClick={() => increaseQuantity(item.item, item._id, item.quantity)}>+</button>
                                <button onClick={() => deleteFromCart(item._id, item.item._id)}>Remove</button>
                            </form>
                            { item.item.myFile1 ?
                                <img className={Css.itemPicture} src={item.item.myFile1} alt="item-pic"/>
                            : null
                            }
                        </div>
                    )
                })
                }
                <h2>Total: ${total}</h2>
            </div>
        </div>
    )
}

export default Cart