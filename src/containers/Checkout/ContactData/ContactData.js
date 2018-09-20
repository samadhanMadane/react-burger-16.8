import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/actions/index';
import Auxs from '../../../hoc/Auxs';
import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../../components/UI/Modal/Modal'

class ContactData extends Component {
    state = {
        orderQuantity: {
            elementType: 'input', 
            elementConfig: {
                type: 'number',
                placeholder: 'Number of quantity'
            },
            value: 1,
            validation: {
                required: true,
                minValue: 1
            },
            valid: false,
            touched: false,
            errorMessage: 'Please Enter valid quantity'                
        },
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid name'                
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid street'                
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid city'                
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid zip code'                
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid country'                
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid email'                
            },
            phone: {
                elementType: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    isPhone: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please Enter valid phone'                
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                                {value: 'fastest', displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                },
                value: 'fastest',
                validation: {},
                valid: true               
            }
        },
        formIsValid: false,
        controls : [
            { label: 'Salad', type: 'salad', quantity: 0},
            { label: 'Bacon', type: 'bacon', quantity: 0},
            { label: 'Cheese', type: 'cheese', quantity: 0},
            { label: 'Meat', type: 'meat', quantity: 0}
        ],
        newOrderStatus: 'New Order',
        purchasing: false
    }

    orderSuccess = () => {
        this.OrderHandler();
        this.setState({purchasing: false});
    }

    onOrderInitHandler = (event) => {
        event.preventDefault();
        this.setState({purchasing : true});
    }

    OrderHandler = () => {
        const formData = {};
        let ingrs = this.state.controls;
        let burgerType = "veg";

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        if (this.props.location.search === "?fromCart") {
            const multipleOrders = this.props.orders;
            multipleOrders.map(order => {
                ingrs.map(ctrl => {
                    if ((ctrl.type === "bacon" || ctrl.type === "meat" ) && order.ingredients[ctrl.type] > 0) {
                        burgerType = 'non-veg';
                    }
                    return ctrl
                })

                const cartOrder = {
                    orderNumber: Math.floor(1000 + Math.random() * 9000),
                    ingredients: order.ingredients,
                    quantity: this.props.quantity,
                    price: order.price,
                    orderData: formData,
                    userId: this.props.userId,
                    status: this.state.newOrderStatus,
                    burgerType: burgerType,
                    orderDate: new Date().toLocaleString()
                }
                this.props.onRemoveCartOrder(this.props.token, order.id);
                this.props.onOrderBurger(cartOrder, this.props.token);
                return order;
            })
        }
        else {
            const burgerIngredients = this.props.ingredients;
            ingrs.map(ctrl => {           
            if ((ctrl.type === "bacon" || ctrl.type === "meat" ) && burgerIngredients[ctrl.type] > 0) {
                burgerType = 'non-veg';
            }
            return ctrl
            })

            const order = {
                orderNumber: Math.floor(1000 + Math.random() * 9000),
                ingredients: this.props.ingredients,
                quantity: this.props.quantity,
                price: this.props.totalAmount,
                orderData: formData,
                userId: this.props.userId,
                status: this.state.newOrderStatus,
                burgerType: burgerType,
                orderDate: new Date().toLocaleString()
            }
            this.props.onOrderBurger(order, this.props.token);
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.minValue) {
            isValid = value >= rules.minValue && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isPhone) {
            const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            isValid = phonePattern.test(value) && isValid
        }

        return isValid;
    }

    orderQuantityChanged = (event) => {
        const updatedOrderQuantity = { ...this.state.orderQuantity };
        updatedOrderQuantity.value = event.target.value;
        updatedOrderQuantity.valid = this.checkValidity(event.target.value, updatedOrderQuantity.validation);
        updatedOrderQuantity.touched = true;
        this.setState({orderQuantity: updatedOrderQuantity});
        if(updatedOrderQuantity.valid) {
            this.props.onChangeOrderQuantity(event.target.value);
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let inputQuantity = (
            <Input 
                elementType={this.state.orderQuantity.elementType}
                elementConfig={this.state.orderQuantity.elementConfig}
                value={this.state.orderQuantity.value}
                changed={this.orderQuantityChanged}
                shouldValidate={this.state.orderQuantity.validation}
                touched={this.state.orderQuantity.touched}
                invalid={!this.state.orderQuantity.valid}
                errorMessage= {this.state.orderQuantity.errorMessage}
            />
        );

        let form = (
            <form onSubmit={this.onOrderInitHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        errorMessage= {formElement.config.errorMessage}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                <Button btnType="Danger">CANCEL</Button>
            </form>
        );
        
        if (this.props.loading) {
            form = <Spinner />
        }
        
        let orderSummary = null, orderDetails = null;

        orderSummary = <OrderSummary 
                            ingredients={this.props.ingredients}
                            isFromContactData= {true}
                            notification="Order Placed Successfully!!!"
                            orderSuccess={this.orderSuccess}/>

        if(this.props.location.search ==='?fromCart') {
            orderDetails = <Auxs>
                                <p className={classes.InputQuantity}>
                                    <h4 className={classes.LabelQuantity}>Number of items</h4>
                                    <h4 className={classes.Quantity}><strong>{this.props.cartCount}</strong></h4>
                                </p>
                                <p className={classes.InputQuantity}>
                                    <h4 className={classes.LabelQuantity}>Total Price</h4>
                                    <span className={classes.TotalPrice}>Rs.&nbsp;&nbsp;<strong>{this.props.totalCartPrice.toFixed(2)}</strong></span>
                                </p>
                            </Auxs>
        }

        else {
            orderDetails = <Auxs>
                                <p className={classes.InputQuantity}>
                                    <h4 className={classes.LabelQuantity}>Quantity you want</h4>
                                    <span className={classes.Quantity}>{inputQuantity}</span>
                                </p>
                                <p className={classes.InputQuantity}>
                                    <h4 className={classes.LabelQuantity}>Total Price</h4>
                                    <span className={classes.TotalPrice}>Rs.&nbsp;&nbsp;<strong>{this.props.totalAmount.toFixed(2)}</strong></span>
                                </p>
                            </Auxs>
        }

        return (
            <div className={classes.ContactData}>
                <Modal show={this.state.purchasing} modalClosed={this.orderSuccess}>
                    {orderSummary}
                </Modal>
                {orderDetails}
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        orders: state.cart.orders,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        orderStatus: state.order.orderStatus,
        quantity: state.burgerBuilder.quantity,
        totalAmount: state.burgerBuilder.total,
        cartCount: state.cart.cartCount,
        totalCartPrice: state.cart.totalCartPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemoveCartOrder: (token, orderId) => dispatch(actions.deleteCartOrder(token, orderId)),
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
        onChangeOrderQuantity: (updatedQuantity) => dispatch(actions.orderQuantityChanged(updatedQuantity)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));