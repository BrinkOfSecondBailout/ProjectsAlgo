import React, {useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Css from '../components/FilterItems.module.css'

const FilterItems = () => {

    const [category, setCategory] = useState("")
    const [items, setItems] = useState([])
    const userId = localStorage.getItem('userId')

    const filterByCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:8000/api/items/filter/' + category)
                .then(response => {
                    const filteredItems = (response.data.filter(item => item.userId !== userId))
                    setItems(filteredItems)
                })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={filterByCategory}>
                <select onChange={(e) => setCategory(e.target.value)} name="category">
                    <option value="" selected disabled hidden>Select One</option>
                    <option value="electronics">Electronics</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="clothings">Clothings/Accessories</option>
                    <option value="toys">Toys/Games</option>
                    <option value="furniture">Furniture</option>
                    <option value="others">Others/Misc</option>
                </select>
                <input type='submit' value='Filter'/>
            </form>

            <div>
                {items?.length !== 0 ?
                    <div className={Css.flex}>
                        { items?.map((item, index) => {
                            return (
                                <div key={index}>

                                    <Link to={`/items/${item._id}`}><div>{item.name} ${item.price}</div></Link>
                                    { item.myFile1 ?
                                    <img className={Css.itemPictureSmall} src={item.myFile1} alt="item-pic"/>
                                    : null
                                    
                                }
                                </div>
                            )
                        }) 
                    }
                    </div>
                : <h3>No results found...</h3>
                }
            </div>
        </div>
    )
}

export default FilterItems