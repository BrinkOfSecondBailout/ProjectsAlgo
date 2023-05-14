import React from 'react'
import Css from '../components/AllItem.module.css'
import {Link} from 'react-router-dom';

const AllItems = (props) => {
    const {items} = props;
    return (
        <div className={Css.allItems}>
            { items.map((item, index) => {
                return (
                    <div className={Css.oneItem}>
                        <h3 key={index}>
                            <Link to={`/items/${item._id}`}>{item.name} ${item.price}</Link>
                            { item.myFile1 ?
                            <div>
                                <img className={Css.itemMainPic} src={item.myFile1} alt="item-pic"/>
                            </div>
                            : null
                            }
                        </h3>
                    </div>
                )
            })
            }
        </div>
    )
}

export default AllItems