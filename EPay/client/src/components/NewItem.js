import React, {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import upload from '../assets/upload.png';
import Css from './NewItem.module.css';
import axios from 'axios';

const NewItem = (props) => {
    const navigate = useNavigate();
    const {items, setItems} = props;
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [condition, setCondition] = useState("")
    const [description, setDescription] = useState("")
    const [postImage1, setPostImage1] = useState({})
    const [postImage2, setPostImage2] = useState({})
    const [postImage3, setPostImage3] = useState({})
    
    const newItemHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/items', {
            name: name,
            price: price,
            condition: condition,
            description: description,
            myFile1: postImage1.myFile,
            myFile2: postImage2.myFile,
            myFile3: postImage3.myFile
        }) .then (response => {
            setItems([...items, response.data])
            console.log(response.data)
            navigate('/')
        }) .catch (err => {
            console.log(err.response.data)
        })
    }

    const handleFileUpload1 = async (e) => {
        const file1 = e.target.files[0];
        const base64 = await convertToBase64(file1);
        setPostImage1({myFile : base64})
    }

    const handleFileUpload2 = async (e) => {
        const file2 = e.target.files[0];
        const base64 = await convertToBase64(file2);
        setPostImage2({myFile : base64})
    }

    const handleFileUpload3 = async (e) => {
        const file3 = e.target.files[0];
        const base64 = await convertToBase64(file3);
        setPostImage3({myFile : base64})
    }

    const convertToBase64 = (file) => {
        return new Promise ((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
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
                <div className={Css.uploadIcons}>
                    <div>
                        <label htmlFor="file-upload1"><img className={Css.uploadIcon} src={postImage1.myFile || upload} alt="file-upload"/></label>
                        <input  type="file" accept="image/*" name="myFile1" id="file-upload1" onChange={(e) => handleFileUpload1(e)}/>
                    </div>
                    <div>
                        <label htmlFor="file-upload2"><img className={Css.uploadIcon} src={postImage2.myFile || upload} alt="file-upload"/></label>
                        <input type="file" accept="image/*" name="myFile2" id="file-upload2" onChange={(e) => handleFileUpload2(e)}/>
                    </div>
                    <div>
                        <label htmlFor="file-upload3"><img className={Css.uploadIcon} src={postImage3.myFile || upload} alt="file-upload"/></label>
                        <input type="file" accept="image/*" name="myFile3" id="file-upload3" onChange={(e) => handleFileUpload3(e)}/>
                    </div>
                </div>
                <div>
                    <input type="submit" value="List Item!"/>
                </div>
            </form>
        </div>
    )
}

export default NewItem