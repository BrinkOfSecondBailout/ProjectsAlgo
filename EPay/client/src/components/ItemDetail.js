import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams , Link , useNavigate } from 'react-router-dom';
import Css from '../components/ItemDetail.module.css'


const ItemDetail = (props) => {
    const {removeFromDom} = props;
    const navigate = useNavigate();
    const [item, setItem] = useState({});
    const {id} = useParams();
    const {user} = item;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get('http://localhost:8000/api/items/' + id)
            .then(response => {
                console.log(response.data)
                setItem(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const addToCart = async (item) => {
        axios.post('http://localhost:8000/api/cart/add/' + userId, {item})
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const watchList = async (item) => {
        axios.post('http://localhost:8000/api/watchlist/add/' + userId, {item})
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const unlistItem = async (itemId) => {
        axios.delete('http://localhost:8000/api/items/delete/' + itemId)
            .then(response => {
                removeFromDom(itemId)
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <Link to='/'>Back to dashboard</Link>
            <h1>{item.name}</h1>
            <h2>${item.price}</h2>
            <h2>{item.condition}</h2>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>Sold By: <Link to={`/users/${user?._id}`}>{user?.firstName}</Link></p>
            <div>
                { item.inventory >= 1 && item.userId !== userId ?
                    <div>
                        <button onClick={() => {addToCart(item)}}>Add to Cart</button>
                        <button onClick={() => {watchList(item)}}>Watchlist</button>
                    </div>
                    : item.userId === userId ? (
                        <button onClick={() => {unlistItem(item._id)}}>Unlist Item</button>
                    )
                    : ( <h4>Currently Sold Out! :(</h4>
                )}
            </div>
            {
                item.myFile1 ?
                    <img className={Css.itemPicture} src={item.myFile1}/>
                : null
            }
            {
                item.myFile2 ? <img className={Css.itemPicture} src={item.myFile2} />
                : null
            }
            {
                item.myFile3 ? <img className={Css.itemPicture} src={item.myFile3} />
                : null
            }
            
        </div>
    )
}

export default ItemDetail