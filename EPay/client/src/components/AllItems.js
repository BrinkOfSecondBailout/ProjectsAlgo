import React from 'react'
import Css from '../components/AllItem.module.css'
import {Link} from 'react-router-dom';

const AllItems = (props) => {
    const {items} = props;
    return (
        <div className={Css.allItems}>
            { items.map((item, index) => {
                return (
                    <h3 key={index}>
                        <Link to={`/items/${item._id}`}>{item.name} ${item.price}</Link>
                        { item.myFile1 ?
                            <img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/>
                        : null
                        }
                    </h3>
                )
            })
            }
        </div>
    )
}

export default AllItems