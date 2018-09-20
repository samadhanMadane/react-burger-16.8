import React, { Component } from 'react';
import classes from './Orders.css';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Auxs from '../../hoc/Auxs';
import Table from '../../components/UI/Table/Table';
//import BSTable from '../../components/UI/Table/BootstrapTable/BSTable';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId, this.props.isAdmin);
    }

    orderDeleteHandler = (event, orderId) => {
        event.preventDefault();
        this.props.onDeleteOrder(this.props.token, orderId);
    }

    orderUpdateHandler = (event, orderId) => {
        event.preventDefault();
        this.props.onUpdateOrder(this.props.token, orderId, event.target.value);
    }

    render() {
        const orderData = this.props.orders.map(order => { return order});
        const orderColumns = [{
            Header: 'Order Number',
            accessor: 'orderNumber'
          },
          {
            Header: 'Order Date',
            accessor: 'orderDate'
          },
          {
            id: 'customerName',
            Header: 'Customer Name',
            accessor: d => d.orderData.name
          },
          {
            Header: 'Price',
            accessor: 'price'
          },
          {
            Header: 'Status',
            accessor: 'status'
          },];

        // const orderColumns = [{
        //     dataField: 'orderNumber',
        //     text: 'Order Number'
        //   },
        //   {
        //     dataField: 'orderDate',
        //     text: 'Order Date'
        //   },
        //   {
        //     dataField: 'orderData.name',
        //     text: 'Customer Name'
        //   },
        //   {
        //     dataField: 'price',
        //     text: 'Price'
        //   },
        //   {
        //     dataField: 'status',
        //     text: 'Status'
        //   },];

        const onOrderClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {
                    this.props.history.replace('/orders/' + rowInfo.original.id);
                    }
            }
        }

        return (
            <Auxs> 
                <h2 className={classes.header}>Orders</h2>
                <span className={classes.OrderTable}>
                    <Table data={orderData} columns={orderColumns} onRowClick={onOrderClick} pageSize={10}/>
                    {/* <BSTable id="orderNumber" data={orderData} columns={orderColumns} /> */}
                </span>
            </Auxs>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));