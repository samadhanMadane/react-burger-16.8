import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSammary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        if (this.props.location.search === "?fromCart") {
            this.props.history.replace('/checkout/contact-data?fromCart');
        }
        else {
            this.props.history.replace('/checkout/contact-data');
        }
    }

    render() {
        let summary = <Redirect to="/"/>
        if (this.props.location.search === "?fromCart") {
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/"/> : null;
            summary = 
                <div>
                    {purchasedRedirect}
                    <CheckoutSammary 
                        orders={this.props.orders}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </div>
        }
        else 
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/"/> : null;
            summary = 
                <div>
                    {purchasedRedirect}
                    <CheckoutSammary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.cart.orders,
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);