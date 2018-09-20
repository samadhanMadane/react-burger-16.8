import React from 'react';
import classes from './Detail.css';
import Button from '../UI/Button/Button';

const detail = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]});
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
        <div className={classes.Detail}>
            <h2 className={classes.OrderNumber}>Order Number : {props.orderNumber}</h2>
            <p>Order Date: {props.orderDate}</p>
            <p>Price: <strong>Rs. {props.price.toFixed(2)}</strong></p>
            {props.orderStatus ? <p className={classes.status}>Status: {updateOrderStatus}</p> : null}
            <p>Ingredients: {ingredientOutput}</p>
            {!props.isFromCart ? <p> {props.burgerType === "veg" ? "Vegetarian" : "Non-Vegetarian"}</p> : null }
            
            <h4 className={classes.Delivery}>Delivery Details</h4>
            <p>Customer Name : {props.orderData.name}</p>
            <p>Shipping Address : {props.orderData.street + ", " + props.orderData.city + "- " + props.orderData.zipCode + ", " + props.orderData.country}</p>
            <p>Phone No. : {props.orderData.phone}</p>
            <p>Email : {props.orderData.email}</p>
            <p>Delivery Method : {props.orderData.deliveryMethod}</p>

            {!props.isFromCart ? <p>
                                    <Button btnType="GoBack" clicked={props.onGoBack}>GO BACK</Button>
                                    <Button btnType="Delete" clicked={props.onDelete}>DELETE</Button>
                                    {props.isAdmin ? 
                                        <Button btnType="Update" clicked={props.onGoBack}>UPDATE</Button>: null}
                                  </p>  : null}
            {props.isFromCart ? 
                <Button btnType="DeleteFromCart" clicked={props.deleteFromCart}>REMOVE FROM CART</Button> : null}
        </div>
    );
}

export default detail;