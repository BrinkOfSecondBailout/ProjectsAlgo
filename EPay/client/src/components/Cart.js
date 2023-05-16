import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Cart = (props) => {
    const [user, setUser] = useState({});
    const id = localStorage.getItem('userId');
    const {cart} = user;

    useEffect(() => {
        axios.get('http://localhost:8000/api/cart/' + id)
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            { cart?.map((cartItem, index) => {
                return (
                    <div key={index}>
                        <h3>{cartItem.item}</h3>
                        <h3>{cartItem.item.price}</h3>
                        <h3>{cartItem.quantity}</h3>
                        { cartItem.item.myFile1 ?
                            <img src={cartItem.item.myFile1} alt="item-pic"/>
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