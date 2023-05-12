import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const NewItem = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [condition, setCondition] = useState("")
    const [description, setDescription] = useState("")
    
    const newItemHandler = (e) => {
        e.preventDefault();

    }

    const convertToBase64 = (e) => {
        console.log(e);
    }

    return (
        <div>
            <h1>List a New Item</h1>
            <div>
                <Link to='/'>Back to dashboard</Link>
                <Link to='/logout'>logout</Link>
            </div>
            <form onSubmit={newItemHandler} method="POST">
                <div>
                    <label>Item Name:</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" name="price" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label>Condition:</label>
                    <select name="condition" onChange={(e) => setCondition(e.target.value)}>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Old">Old</option>
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea rows="7" cols="25" type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <input type="submit" value="List Item!"/>
                </div>
            </form>
        </div>
    )
}

export default NewItem