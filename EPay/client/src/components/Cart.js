import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Css from '../components/Cart.module.css'

const Cart = (props) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const {items} = cart;
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

    const quantityChange = async (e, itemId) => {
        try {
            const newQuantity = e.target.value
            console.log(id)
            console.log(itemId)
            console.log(newQuantity)
            axios.patch('http://localhost:8000/api/cart/update/' + id, {
                itemId: itemId,
                quantity: newQuantity
            })
            console.log('Quantity successfully updated')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Link to='/'>Back to dashboard</Link>
            { items?.map((item, index) => {
                return (
                    <div key={index}>
                        <h3>{item.item.name}</h3>
                        <h3>${item.item.price}</h3>
                        <form>
                            <label><h4>Quantity:</h4></label>
                            <select onChange={(e) => {quantityChange(e, item._id)}}>
                                <option selected="selected" value={item.quantity}>{item.quantity}</option>
                                <option value={item.quantity + 1}>{item.quantity + 1}</option>
                                <option value={item.quantity + 2}>{item.quantity + 2}</option>
                            </select>
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
    )
}

export default Cart