import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSammary = (props) => {
    let burgerSummary = null;

    if (props.orders) {
        burgerSummary = props.orders.map(order => <Burger ingredients={order.ingredients}/>)
    }
    else if (props.ingredients) {
        burgerSummary = <Burger ingredients={props.ingredients}/>
    }
    return (
        <div className={classes.CheckoutSammary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                {burgerSummary}
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}> CANCEL </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}> CONTINUE </Button>
        </div>
    );
}

export default checkoutSammary;