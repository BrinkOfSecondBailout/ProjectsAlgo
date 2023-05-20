import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email,
            password
        })
            .then(response=>{
                window.localStorage.setItem('isLogged', true)
                window.localStorage.setItem('userId', response.data.id)
                window.location.reload();
                navigate('/')
            })
            .catch(err => {
                const errorReponse = err.response.data;
                console.log(err.response.data);
                setErrors(errorReponse);
            })
    }


    return (
        <div>
            <h1>Login</h1>
            {errors ? <p>{errors}</p> : null}
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