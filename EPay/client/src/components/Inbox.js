import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import TopNavigation from './TopNavigation';
import avatar from '../assets/avatar.png';
import Css from '../components/Inbox.module.css'
import SideBar from './SideBar';

const Inbox = (props) => {
    const {myItems, user, cart} = props;
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

    useEffect(() => {
        axios.get('http://localhost:8000/api/inbox/reset/' + id)
            .then(response => {
                console.log(response.data);
                
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div>
                    <SideBar myItems={myItems}/>
                </div>
                <div className={Css.rightBody}>
                    <div>
                        <h1>Inbox</h1>
                        { messageThreads
                            ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                            .map((thread, index) => {
                            return (
                                <div>
                                    <div key={index}>
                                        <div className={Css.oneCorr}>
                                            <div className={Css.logoAndName}>
                                                <div className={Css.logo}>
                                                    { thread.correspondence.myFile ?
                                                        <img className={Css.profilePic} src={thread.correspondence.myFile} alt="avatar"/>
                                                        : <img className={Css.profilePic} src={avatar} alt="no-avatar"/>
                                                    }
                                                </div>
                                                <div className={Css.name}>
                                                    <h3><Link to={`/inbox/correspondence/${thread.correspondence._id}/${userId}`}>{thread.correspondence.firstName} {thread.correspondence.lastName}</Link></h3>
                                                </div>
                                            </div>
                                            <div className={Css.messagePreview}>
                                                {thread.messages && thread.messages.length > 0 ? 
                                                    
                                                    thread.messages[thread.messages.length - 1].message.unread == "true"
                                                    ? (<div>
                                                        <p><b>{thread.messages[thread.messages.length - 1].message.message}</b></p>
                                                    </div>)
                                                    : (<div>
                                                        <p>{thread.messages[thread.messages.length - 1].message.message}</p>
                                                    </div>)
                                                    
                                                : ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox