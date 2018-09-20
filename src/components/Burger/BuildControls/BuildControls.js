import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
        return (
            <div className={classes.BuildControls}>
                <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
                {controls.map(ctrl => (
                    <BuildControl
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
                ))}
                <div className={classes.OrderContent}>
                    {props.isAuth ?
                    <button 
                        className={classes.OrderButton} 
                        disabled={!props.purchasable}
                        onClick={props.addToCart}>ADD TO CART</button> : null}
                    <button 
                        className={classes.OrderButton} 
                        disabled={!props.purchasable}
                        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN to CONTINUE'}</button>
                </div>
            </div>
        );
}

export default buildControls;