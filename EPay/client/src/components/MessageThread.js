import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom';
import TopNavigation from './TopNavigation';
import axios from 'axios';
import Css from '../components/MessageThread.module.css'
import { format } from 'date-fns';
import avatar from '../assets/avatar.png';

const MessageThread = (props) => {
    const {user, cart} = props;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const userId = localStorage.getItem('userId');
    const {id} = useParams();
    const [correspondence, setCorrespondence] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/inbox/show/${id}/${userId}`)
            .then(response => {
                setMessages(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(response => {
                console.log(response.data)
                setCorrespondence(response.data)
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
            <h2><Link to={`/users/${correspondence._id}`}>{correspondence.firstName} {correspondence.lastName}</Link></h2>
            { user.myFile ?
                    <Link to={`/users/${correspondence._id}`}><img className={Css.profilePic} src={user.myFile} alt="avatar"/></Link>
                    : <Link to={`/users/${correspondence._id}`}><img className={Css.profilePic} src={avatar} alt="no-avatar"/></Link>
            }
            <div className={Css.totalMessages}>
                {
                    messages?.map((message, index) => {
                        const formattedDate = format(new Date(message.message.createdAt), 'MM/dd HH:mm');
                        return (
                            <div>
                                <div key={index}>
                                    {
                                        message.path === "in" ? 
                                        <div className={Css.leftMessage}>
                                            <div className={Css.incoming}>
                                                <p>{message.message.message}</p>
                                                <p className={Css.dateFont}>{formattedDate}</p>
                                            </div>
                                            <div className={Css.rightEmpty}></div>
                                        </div>
                                        : 
                                        <div className={Css.rightMessage}>
                                            <div className={Css.leftEmpty}></div>
                                            <div className={Css.outgoing}>
                                                <p>{message.message.message}</p>
                                                <p className={Css.dateFont}>{formattedDate}</p>
                                            </div>
                                        </div>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <form>
                <div className={Css.replyBox}>
                <textarea className={Css.messageBox} rows="6" type="text" name="description" onChange={(e) => setMessage(e.target.value)}/>
                <div>
                    <button className={Css.replyButton}>Reply</button>
                </div>
                </div>
            </form>
        </div>

    )
}

export default MessageThread