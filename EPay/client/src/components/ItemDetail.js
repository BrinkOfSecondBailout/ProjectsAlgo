import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams , Link } from 'react-router-dom';
import Css from '../components/ItemDetail.module.css'


const ItemDetail = (props) => {
    const [item, setItem] = useState({});
    const {id} = useParams();
    const {user} = item;

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

    return (
        <div>
            <h1>{item.name}</h1>
            <h2>${item.price}</h2>
            <h2>{item.condition}</h2>
            <p>{item.description}</p>
            <p>Sold By: <Link to={`/users/${user?._id}`}>{user?.firstName}</Link></p>
            {
                item.myFile1 ? <img className={Css.itemPicture} src={item.myFile1} alt="item-pic"/>
                : null
            }
            {
                item.myFile2 ? <img className={Css.itemPicture} src={item.myFile2} alt="item-pic"/>
                : null
            }
            {
                item.myFile3 ? <img className={Css.itemPicture} src={item.myFile3} alt="item-pic"/>
                : null
            }
        </div>
    )
}

export default ItemDetail