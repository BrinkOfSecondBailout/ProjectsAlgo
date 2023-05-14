import React from 'react'
import Css from '../components/AllItem.module.css'
import {Link} from 'react-router-dom';

const AllItems = (props) => {
    const {items} = props;
    return (
        <div className={Css.allItems}>
            { items.map((item, index) => {
                return <h4 key={index}>
                    <Link to={`/api/items/${item._id}`}>{item.name} ${item.price}</Link>
                    <div>
                        <img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/>
                    </div>
                </h4>
            })
            }
        </div>
    )
}

export default AllItems