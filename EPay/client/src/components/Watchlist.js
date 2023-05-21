import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Css from '../components/Cart.module.css'
const Watchlist = (props) => {
    const id = localStorage.getItem('userId');
    const [watchlist, setWatchlist] = useState([])
    const {items} = watchlist || {};

    useEffect(() => {
        axios.get('http://localhost:8000/api/watchlist/show/' + id)
            .then(response => {
                setWatchlist(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div>
            <h1>Watchlist</h1>
            { items?.map((item, index) => {
                return (
                    <div key={index}>
                        <div>
                            <h3>{item.item.name}</h3>
                            <h3>${item.item.price}</h3>
                            <button>Remove</button>
                        </div>
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

export default Watchlist