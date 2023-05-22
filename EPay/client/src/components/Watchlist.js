import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Css from '../components/Cart.module.css'
import TopNavigation from './TopNavigation';

const Watchlist = (props) => {
    const {user, cart} = props;
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

    const removeFromWatchlist = async (itemId) => {
        console.log(itemId)
        try {
            axios.delete(`http://localhost:8000/api/watchlist/remove/${id}/${itemId}`)
                .then(response => {
                    console.log('Successfully removed item')
                    window.location.reload();
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <div>
                <TopNavigation user={user} cart={cart}/>
            </div>
            <div>
                <h1>Watchlist</h1>
                { items?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <h3>{item.item.name}</h3>
                                <h3>${item.item.price}</h3>
                                <button onClick={() => removeFromWatchlist(item.item._id)}>Remove</button>
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
        </div>
    )
}

export default Watchlist