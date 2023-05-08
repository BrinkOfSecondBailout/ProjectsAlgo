import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
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
            <h1>Login</h1>
            <form onSubmit={loginUser} method="POST">
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Login"/>
            </form>

            <Link to='/register'>Register an account</Link>
        </div>
    )
}

export default Login