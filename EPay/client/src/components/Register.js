import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Css from '../components/Register.module.css';

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
                firstName,
                lastName,
                email,
                password
            })
            .then(response => {
                console.log(response.data)
                window.localStorage.setItem('isLogged', true)
                window.localStorage.setItem('userId', response.data.id)
                navigate('/')
                window.location.reload();
            })
            .catch(err => {
                const errorReponse = err.response.data.errors;
                console.log(err.response.data.errors);
                setErrors(errorReponse);
            })
    }


    return (
        <div className={Css.registerBody}>
            <h1>Register Account</h1>
            <form onSubmit={registerUser} method="POST">
                    {errors.firstName? <p>{errors.firstName.message}</p> : null}
                    <label>First Name:</label>
                <div>
                    <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                    {errors.lastName? <p>{errors.lastName.message}</p> : null}
                    <label>Last Name:</label>
                <div>
                    <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                    {errors.email? <p>{errors.email.message}</p> : null}
                    <label>Email:</label>
                <div>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                    {errors.password? <p>{errors.password.message}</p> : null}
                    <label>Password</label>
                <div>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Register"/>
            </form>

            <div>
                <Link to='/'>Go to Login</Link>
            </div>
        </div>
    )
}

export default Register