import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import TopNavigation from './TopNavigation';
import axios from 'axios';

const MessageThread = (props) => {
    const {user, cart} = props;
    const [messages, setMessages] = useState([]);
    const userId = localStorage.getItem('userId');
    const {id} = useParams();

    useEffect(() => {
        console.log(id)
        console.log(userId)
        axios.get(`http://localhost:8000/api/inbox/show/${id}/${userId}`)
            .then(response => {
                console.log(response.data)
                setMessages(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <div>
                <TopNavigation user={user} cart={cart}/>
            </div>
            <div>
                {
                    messages?.map((message, index) => {
                        return (
                            <div>
                                <div key={index}>
                                    <h3>{message.message.message}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default MessageThread