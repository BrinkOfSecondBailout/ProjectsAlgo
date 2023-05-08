import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function registerUser(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName, lastName, email, password
            }),
        })

        const data = await response.json()
        if(data.user) {
            navigate('/dashboard')
        }

        console.log(data);
    }


    return (
        <div>
            <h1>Register Account</h1>
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