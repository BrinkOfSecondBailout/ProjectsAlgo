import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

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
                navigate('/dashboard')
            })
            .catch(err => {
                const errorReponse = err.response.data.errors;
                console.log(err.response.data.errors);
                setErrors(errorReponse);
            })
    }


    return (
        <div>
            <h1>Register Account</h1>
            {errors.firstName? <p>{errors.firstName.message}</p> : null}
            {errors.lastName? <p>{errors.lastName.message}</p> : null}
            {errors.email? <p>{errors.email.message}</p> : null}
            {errors.password? <p>{errors.password.message}</p> : null}
            <form onSubmit={registerUser} method="POST">
                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
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