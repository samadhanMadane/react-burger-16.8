import React from 'react';

import classes from './Order.css';
import Button from '../UI/Button/Button';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span style= {{
                                textTransform: 'capitalize',
                                display: 'inline-block',
                                margin: '0 8px',
                                border: '1px solid grey',
                                padding: '5px',
                                background: 'linear-gradient(white, lightblue)'
                            }} key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    let updateOrderStatus = null;
    if(props.isAdmin) {
        updateOrderStatus = <select  
                                className={classes.selectInput}
                                value={props.orderStatus} onChange={props.changed}>
                                <option key="new_order" value="New Order">New Order</option>
                                <option key="in_progress" value="In Progress">In Progress</option>
                                <option key="completed" value="Completed">Completed</option>
                              </select>
    }
    else {
        updateOrderStatus = props.orderStatus;
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>Rs. {props.price.toFixed(2)}</strong></p>
            {!props.isFromCart ? <p> {props.burgerType === "veg"? "Vegetarian" : "Non-Vegetarian"}</p> : null }
            {props.orderStatus ? <p className={classes.status}>Status: {updateOrderStatus}</p> : null} 
            {!props.isFromCart ? <p><Button btnType="Delete" clicked={props.onDelete}>DELETE</Button></p> : null}
            {props.isFromCart ? 
                <Button btnType="DeleteFromCart" clicked={props.deleteFromCart}>REMOVE FROM CART</Button> : null}
        </div>
    );
    
};

export default order;