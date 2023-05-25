import React, {useEffect, useState} from 'react'
import { useParams , useNavigate} from 'react-router-dom';
import TopNavigation from './TopNavigation'
import Css from '../components/NewMessage.module.css'
import axios from 'axios';

const NewMessage = (props) => {
    const {inbox, user, cart} = props;
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                axios.get('http://localhost:8000/api/users/' + id)
                .then(response => {
                    setReceiver(response.data)
                })
                .catch(err => console.log(err))
            } catch (err) {
                console.log(err)
            }
        };
        fetchUser();
    }, []);

    const newMessageHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/inbox/new/' + id, {
            message: message,
            user: user
        }) .then(response => {
            console.log(response.data)
            navigate('/')
        }) .catch(err => {
            console.log(err)
        })
    }


    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div>
                <h1>Send {receiver.firstName} a message</h1>
                <form onSubmit={newMessageHandler} method="POST">
                    <textarea className={Css.messageBox} rows="10" type="text" name="description" onChange={(e) => setMessage(e.target.value)}/>
                    <div>
                        <button className={Css.sendButton}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewMessage