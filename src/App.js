import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { AnimatedSwitch } from 'react-router-transition';
import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders  from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/actions/index';
import DetailOrder from './containers/Orders/DetailOrder/DetailOrder';
import Admin from './containers/Admin/Admin'

//For Optimization of project
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncCart = asyncComponent(() => {
  return import('./containers/Cart/Cart');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
        <Switch>
                <Route path="/auth" exact component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/auth/admin" exact component={asyncAuth} />
                <Redirect to="/" />
        </Switch>
      
    );

    if (this.props.isAuthenticated && !this.props.isAdmin) {
      routes = (
          <Switch>
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" exact component={asyncOrders} />
                <Route path="/orders/:orderId" exact component={DetailOrder} />
                <Route path="/cart" component={asyncCart} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/auth" exact component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} /> 
                <Redirect to="/" />
        </Switch>
      );
    }
    if (this.props.isAuthenticated && this.props.isAdmin) {
      routes = (
          <Switch>
            <Route path="/logout" exact component={Logout} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/orders" exact component={asyncOrders} />
            <Route path="/orders/:orderId" exact component={DetailOrder} />
            <Redirect to="/admin" /> 
          </Switch>
        );
      }
    return (
      <div>
         <Layout>
            {routes}
         </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
