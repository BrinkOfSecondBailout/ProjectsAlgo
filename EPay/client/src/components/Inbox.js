import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import TopNavigation from './TopNavigation';

const Inbox = (props) => {
    const {user, cart} = props;
    const userId = localStorage.getItem('userId')
    const {id} = useParams();
    const [inbox, setInbox] = useState([])
    const {messageThreads} = inbox || {};

    useEffect(() => {
        axios.get('http://localhost:8000/api/inbox/' + id)
            .then(response => {
                setInbox(response.data)
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
                <h1>Inbox</h1>
                { messageThreads?.map((thread, index) => {
                    return (
                        <div>
                            <div key={index}>
                                <h3><Link to={`/inbox/correspondence/${thread.correspondence._id}/${userId}`}>{thread.correspondence.firstName} {thread.correspondence.lastName}</Link></h3>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Inbox