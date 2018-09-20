import React, { Component } from 'react';
import classes from './Cart.css';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Auxs from '../../hoc/Auxs';

class Cart extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onFetchCartOrders(this.props.token, this.props.userId, this.props.isAdmin);
    }

    orderDeleteFromCartHandler = (event, orderId) => {
        event.preventDefault();
        this.props.onDeleteCartOrder(this.props.token, orderId);
    }

    orderFromCartHandler = (event, orderId) => {
        event.preventDefault();
        this.props.onOrderFromCart(this.props.token, orderId, event.target.value);
    } 

    buyFromCarthandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing : true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout?fromCart');
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                        <Order 
                            key= {order.id}
                            ingredients= {order.ingredients}
                            price={+order.price}
                            deleteFromCart={(event) => this.orderDeleteFromCartHandler(event, order.id)}
                            isAdmin={this.props.isAdmin}
                            isFromCart={true}/>
            ))
        }

        let orderSummary = <OrderSummary 
        orders={this.props.orders}
        price={this.props.totalCartPrice}
        cartCount= {this.props.cartCount}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        isFromCart={true}/>

        return (
            <Auxs> 
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <h2 className={classes.header}>Your Cart</h2>
                <p>{orders}</p>
                <div className={classes.BuyOrder}>
                    {this.props.orders.length > 0 ?
                        <span>Total Price : <strong>Rs. {this.props.totalCartPrice}</strong><button className={classes.OrderButton} onClick={this.buyFromCarthandler}>BUY NOW ({this.props.cartCount})</button></span>
                    : <span>No Items in Cart</span>}
                </div>
            </Auxs>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        orders: state.cart.orders,
        loading: state.cart.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        isAdmin: state.auth.isAdmin,
        cartCount: state.cart.cartCount,
        totalCartPrice: state.cart.totalCartPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCartOrders: (token, userId, isAdmin) => dispatch(actions.fetchCartOrders(token, userId, isAdmin)),
        onDeleteCartOrder: (token, orderId) => dispatch(actions.deleteCartOrder(token, orderId)),
        onOrderFromCart: (token, orderId) => dispatch(actions.orderFromCart(token, orderId)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Cart, axios));