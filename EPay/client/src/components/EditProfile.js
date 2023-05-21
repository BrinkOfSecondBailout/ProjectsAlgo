import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import avatar from '../assets/avatar.png';
import axios from 'axios';
import Css from './EditProfile.module.css'

const EditProfile = (props) => {

    const {user} = props;
    const [postImage, setPostImage] = useState({myFile: user.myFile});
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const userId = localStorage.getItem('userId');

    const createPost = async (newImage) => {
        try {
            await axios.patch('http://localhost:8000/api/users/profile/' + userId, newImage)
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

    const updateUser = async (e) => {
        try {
            e.preventDefault();
            await axios.patch('http://localhost:8000/api/users/update/' + userId, {
                firstName: firstName,
                lastName: lastName,
                email: email
            })
                .then(response => {
                    console.log(response);

                })
                .catch(err => console.log(err))

        } catch (error) {
            console.log(error)
        }
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

            <div>
                <form onSubmit={updateUser}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <input type="submit" value="Update"/>
                    </form>
            </div>
        </div>
    )
}

export default EditProfile