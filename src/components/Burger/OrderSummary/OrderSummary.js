import React, { Component } from 'react';
import Auxs from '../../../hoc/Auxs';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    shouldComponentUpdate( nextProps, nextState ){
        return nextProps !== this.props;
    }

    render() {
        let ingredientSummary = null;
        let orderPopup = null;

        if (this.props.isFromContactData) {
            orderPopup = (
                <Auxs>
                    {this.props.notification}<br></br><br></br>
                    <Button btnType="Delete" clicked={this.props.orderSuccess}>OKAY</Button>
                </Auxs>
            )
        }
        else if (this.props.isFromCart && this.props.addToCart) {
            orderPopup = (
                <Auxs>
                    {this.props.notification}<br></br><br></br>
                    <Button btnType="Delete" clicked={this.props.addToCartSuccess}>OKAY</Button>
                </Auxs>
            );
        }
        else if(this.props.ingredients) {
            ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]} 
                </li>
                );
            });

            orderPopup = (
                <Auxs>
                    <p>A delicious burger with following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType="Cart" clicked={this.props.addOrderToCart}>ADD TO CART</Button>
                    <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
                </Auxs>
            );
        }

        else {
            ingredientSummary = this.props.orders
            .map(order => {
                let showPrice = <Auxs key={order.id}><span><strong>Price : Rs.{order.price}</strong></span><hr></hr></Auxs>;
                return (
                    Object.keys(order.ingredients)
                    .map(igKey => {
                        return (
                            <span key={igKey}>
                                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: <span style={{ marginRight : '5px' }}>{order.ingredients[igKey]}</span>
                            </span>
                        );
                    }).concat(showPrice)
                );
            });

            orderPopup = (
                <Auxs>
                    <p>A delicious burger with following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to Checkout?</p>
                    <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
                </Auxs> 
            );
        }

        return (
            <Auxs>
                <h3>Your Order</h3>
                {orderPopup}
            </Auxs> 
        );
    }
}

export default OrderSummary;