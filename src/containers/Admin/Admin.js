import React, { Component } from 'react';
import classes from './Admin.css';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Auxs from '../../hoc/Auxs';
import Charts from '../../components/UI/Charts/Charts';
import Table from '../../components/UI/Table/Table';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId, this.props.isAdmin);
    }

    render() {
        let vegBurger= 0, nonVegBurger= 0;
        let newOrder=0 , inProgress= 0, completed= 0, cancelled= 0;

        this.props.orders.map(order => {
            if(order.burgerType === "veg") { vegBurger++ } else { nonVegBurger++ }
            if(order.status === "New Order") { newOrder++ }
            if(order.status === "In Progress") { inProgress++ }
            if(order.status === "Completed") { completed++ }
            if(order.status === "Cancelled") { cancelled++ }
            return order;
        })

        let newOrderData = [], inProgressOrderData = [], completedOrderData = [];
        this.props.orders.map(order => {
            if (order.status === "New Order"){
                newOrderData.push(order);
            }return order;
        });

        this.props.orders.map(order => {
            if (order.status === "In Progress"){
                inProgressOrderData.push(order);
            }return order;
        });

        this.props.orders.map(order => {
            if (order.status === "Completed"){
                completedOrderData.push(order);
            }return order;
        });

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
          },];

          const onOrderClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {
                    this.props.history.replace('/orders/' + rowInfo.original.id);
                }
            }
        }

        const doughnutData = {
            labels: ['Vegetarian','Non-Vegetarian'],
                datasets: [
                    {
                        label: 'Veg/Non-Veg',
                        data: [
                            vegBurger,
                            nonVegBurger
                        ],
                        backgroundColor: [
                            '#83bd7c',
                            '#f3ad7c',
                        ]
                    }
                ]
        }

        const pieData = {
            labels: ['New Order','In Progress','Completed', 'Cancelled'],
                datasets: [
                    {
                        label: 'Order Count',
                        data: [
                            newOrder,
                            inProgress,
                            completed,
                            cancelled
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 192, 192, 0.6)'
                        ]

                    }
                ]
        }

        const barData = {
            labels: ["Salad", "Bacon", "Cheese", "Meat"],
            datasets: [
                {
                    label: "2017",
                    backgroundColor: "lightgrey",
                    data: [65, 59, 80, 81]
                },
                {
                    label: "2018",
                    backgroundColor: "rgba(151,187,205,0.5)",
                    data: [28, 48, 40, 19]
                }
            ]
        };

        const lineData = {
            labels: ["2015", "2016", "2017", "2018"],
            datasets: [
                {
                    label: "Sale",
                    backgroundColor: "lightgrey",
                    data: [20, 35, 56, 64]
                },
                {
                    label: "Profit",
                    backgroundColor: "rgba(151,187,205,0.5)",
                    data: [22, 48, 60, 75]
                }
            ]
        };

        return (
            <Auxs>
                <h2 className={classes.AdminHeader}>Welcome Admin!</h2>
                {this.props.isAdmin ? 
                    <Charts 
                        dData={doughnutData} pData={pieData} bData={barData} lData={lineData}
                        dTitle="Veg/Non-Veg" pTitle="Order Status" bTitle="Yearly Sale" lTitle="Sale"
                    />
                : null }
                <h2 className={classes.header}>Orders</h2>
                <h4 className={classes.header4}>New Orders</h4>
                {newOrderData.length > 0 ? <span className={classes.OrderTable}>
                                                <Table data={newOrderData} columns={orderColumns} onRowClick={onOrderClick} pageSize={5}/>
                                           </span> : <span>No New Orders</span>}
                <h4 className={classes.header4}>In Progress Orders</h4>
                {inProgressOrderData.length > 0 ? <span className={classes.OrderTable}>
                                                    <Table data={inProgressOrderData} columns={orderColumns} onRowClick={onOrderClick} pageSize={5}/>
                                                  </span> : <span>No In Progress Orders</span>}
                <h4 className={classes.header4}>Completed Orders</h4>
                {completedOrderData.length > 0 ? <span className={classes.OrderTable}>
                                                    <Table data={completedOrderData} columns={orderColumns} onRowClick={onOrderClick} pageSize={10}/>
                                                 </span> : <span>No Completed Orders</span>}
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