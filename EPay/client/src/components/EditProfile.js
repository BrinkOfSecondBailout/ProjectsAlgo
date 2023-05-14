import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import avatar from '../assets/avatar.png';
import axios from 'axios';
import Css from './EditProfile.module.css'

const EditProfile = (props) => {

    const {user} = props;
    const [postImage, setPostImage] = useState({myFile: user.myFile});
    const [message, setMessage] = useState("");


    const createPost = async (newImage) => {
        try {
            await axios.patch('http://localhost:8000/api/users/profile/' + user._id, newImage)
            setMessage("Success! Profile photo updated!")
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = (e) => {
        e.preventDefault();
        createPost(postImage);
        console.log("Uploaded");
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({myFile : base64})
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
            <h1>Edit Your Profile, {user.firstName}</h1>
            <div>
                <Link to='/'>Back to dashboard</Link>
                <Link to='/logout'>logout</Link>
            </div>
            <div>
                <h3>Upload profile picture</h3>

                <form onSubmit={uploadImage} encType="multipart/form-data">
                    <div><label htmlFor="file-upload"><img className={Css.customUpload} src={postImage.myFile || avatar} alt=""/></label></div>
                    <input type="file" accept="image/*" name="myFile" id="file-upload" required  onChange={(e) => handleFileUpload(e)}/>
                    <input type="submit" value="Upload"/>
                </form>
                { message ? <p>{message}</p> : null }


            </div>
        </div>
    )
}

export default EditProfile