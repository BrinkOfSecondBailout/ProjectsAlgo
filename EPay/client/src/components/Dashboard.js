import React , {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Css from './Dashboard.module.css'
import AllItems from './AllItems';
import AllMyItems from './AllMyItems';
import AllSellers from './AllSellers';
import FilterItems from './FilterItems';
import TopNavigation from './TopNavigation';
import axios from 'axios';

const Dashboard = (props) => {
    const {inbox, cart, items, myItems} = props;
    const id = localStorage.getItem('userId');
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + id)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => console.log(err));
    }, []);


    return ( 
        <div>
            <div>
                <TopNavigation inbox={inbox} user={user} cart={cart}/>
            </div>
            <div className={Css.body}>
                <div className={Css.leftBody}>
                    <div className={Css.topLeftBody}>
                        <h1>My Items</h1>
                        <Link to='/items/new'><button className={Css.listButton}><h4>List a new item</h4></button></Link>
                        <AllMyItems myItems={myItems}/>
                    </div>
                    <div className={Css.bottomLeftBody}>
                        <FilterItems />
                        <h1>Browse By Sellers</h1>
                        <AllSellers />
                    </div>
                </div>
                <div className={Css.rightBody}>
                    <h1>Shop All Items</h1>
                    <div className={Css.allItemsDiv}>
                        <AllItems items={items}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard