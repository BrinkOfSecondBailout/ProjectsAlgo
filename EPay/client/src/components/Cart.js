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
            { cart?.map((item, index) => {
                return (
                    <h3 key={index}>
                        {item.name}
                        { item.myFile1 ?
                            <img src={item.myFile1} alt="item-pic"/>
                        : null
                        }
                    </h3>
                )
            })

            }
        </div>
    )
}

export default Cart