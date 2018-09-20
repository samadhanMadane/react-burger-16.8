import React, { Component } from 'react';
import Auxs from '../../hoc/Auxs';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        addToCart: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    addToCartSuccess = () => {
        this.setState({purchasing: false});
        this.props.onInitIngredients();
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing : true});
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    addToCart = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing : true, addToCart: true});
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalAmount,
            userId: this.props.userId,
        }

        this.props.onAddToCart(order, this.props.token);
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Auxs>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.addIngredientHandler} 
                        ingredientRemoved={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        addToCart={this.addToCart}
                        price={this.props.totalPrice}
                        isAuth= {this.props.isAuthenticated}/>
                </Auxs>
            );
            if(this.state.addToCart) {
                orderSummary = <OrderSummary 
                                    ingredients={this.props.ingredients}
                                    isFromCart= {true}
                                    notification="Added to Cart Successfully!!!"
                                    addToCart={this.state.addToCart}
                                    addToCartSuccess={this.addToCartSuccess}/>
            }
            else {
                orderSummary = <OrderSummary 
                                    ingredients={this.props.ingredients}
                                    price={this.props.totalPrice}
                                    addOrderToCart={this.addToCart}
                                    purchaseCancelled={this.purchaseCancelHandler}
                                    purchaseContinued={this.purchaseContinueHandler}/>
            }
            
        }

        return (
            <Auxs>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}    
            </Auxs>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        quantity: state.burgerBuilder.quantity,
        totalAmount: state.burgerBuilder.total,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onAddToCart: (order, token) => dispatch(actions.addToCart(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));