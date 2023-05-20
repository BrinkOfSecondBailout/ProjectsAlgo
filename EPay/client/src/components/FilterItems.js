import React, {useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const FilterItems = () => {

    const [category, setCategory] = useState("")
    const [items, setItems] = useState([])

    const filterByCategory = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8000/api/items/${category}`)
            .then(response => {
                setItems(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={filterByCategory}>
                <select onChange={(e) => setCategory(e.target.value)} name="category">
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
                    <div>
                        { items?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/items/${item._id}`}>{item.name} ${item.price}</Link>
                                    { item.myFile1 ?
                                    <img src={item.myFile1} alt="item-pic"/>
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