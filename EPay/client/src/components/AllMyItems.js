import React from 'react';
import Css from '../components/AllItems.module.css';
import {Link} from 'react-router-dom';

const AllMyItems = (props) => {
    const {myItems} = props;

    return (
        <div>
            { myItems.length !== 0
                ? <div className={Css.allItems}>
                    { myItems.map((item, index) => {
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
                : <div className={Css.noItems}><h3>No Items Listed Yet</h3></div>
            }
        </div>
        
    )
}

export default AllMyItems