import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './DetailOrder.css';
import axios from '../../../axios-orders';
import * as actions from '../../../Store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Detail from '../../../components/Order/Detail';

class DetailOrder extends Component {
    orderDeleteHandler = (event, orderId) => {
        event.preventDefault();
        this.props.onDeleteOrder(this.props.token, orderId);
        this.props.history.replace('/orders');
    }

    orderUpdateHandler = (event, orderId) => {
        event.preventDefault();
        this.props.onUpdateOrder(this.props.token, orderId, event.target.value);
    } 

    goBackHandler = () => {
        this.props.history.replace('/orders');
    }
    
    render() {
        const index = this.props.orders.findIndex( order => { return order.id === this.props.match.params.orderId})
        let detailOrder = this.props.orders[index];
        let detailSummary = <Detail 
                            key= {detailOrder.id}
                            orderNumber= {detailOrder.orderNumber}
                            orderDate= {detailOrder.orderDate}
                            ingredients= {detailOrder.ingredients}
                            orderData = {detailOrder.orderData}
                            burgerType = {detailOrder.burgerType}
                            price={+detailOrder.price}
                            orderStatus={detailOrder.status}
                            changed={(event) => this.orderUpdateHandler(event, detailOrder.id)}
                            onDelete={(event) => this.orderDeleteHandler(event, detailOrder.id)}
                            onGoBack={this.goBackHandler}
                            isAdmin={this.props.isAdmin}/>

        return (
            <div className={classes.DetailOrder}>
                {detailSummary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        isAdmin: state.auth.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId, isAdmin) => dispatch(actions.fetchOrders(token, userId, isAdmin)),
        onDeleteOrder: (token, orderId) => dispatch(actions.deleteOrder(token, orderId)),
        onUpdateOrder: (token, orderId, changedValue) => dispatch(actions.updateOrder(token, orderId, changedValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DetailOrder, axios));