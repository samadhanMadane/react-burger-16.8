import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addToCart = (order, token) => {
    return dispatch => {
        dispatch(addToCartStart());
        axios.post('/cart.json?auth=' + token, order)
            .then(response => {
                dispatch(addToCartSuccess(response.data.name, order));
            } )
            .catch(error => {
                dispatch(addToCartFail(error));
            } );
    };
};

export const addToCartSuccess = (id, order) => {
    return {
        type: actionTypes.ADD_TO_CART_SUCCESS,
        orderId: id,
        order: order
    };
};

export const addToCartFail = (error) => {
    return {
        type: actionTypes.ADD_TO_CART_FAIL,
        error: error
    };
};

export const addToCartStart = () => {
    return {
        type: actionTypes.ADD_TO_CART_START
    }
}

export const fetchCartOrders = (token, userId, isAdmin) => {
    return dispatch => {
        dispatch(fetchCartOrdersStart());
        let queryParams ='';
        if(isAdmin) {
            queryParams = '?auth=' + token;
        }
        else {
            queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
        }
        axios.get('/cart.json' + queryParams)
            .then(res => {
                let totalCartPrice = 0;
                const fetchedOrders = [];
                for (let key in res.data) {
                    totalCartPrice += res.data[key].price;
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchCartOrdersSuccess(fetchedOrders, fetchedOrders.length, totalCartPrice));
            })
            .catch(error => {
                dispatch(fetchCartOrdersFail(error));
            });
    }
}

export const fetchCartOrdersStart = () => {
    return {
        type: actionTypes.FETCH_CART_ORDERS_START,
    }
}


export const fetchCartOrdersSuccess = (orders, cartCount, totalCartPrice) => {
    return {
        type: actionTypes.FETCH_CART_ORDERS_SUCCESS,
        orders: orders,
        cartCount: cartCount,
        totalCartPrice: totalCartPrice
    }
}

export const fetchCartOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_CART_ORDERS_FAIL,
        error: error
    }
}


export const deleteCartOrder = (token, orderId) => {
    return dispatch => {
        dispatch(deleteCartOrderStart());
        const queryParams = '?auth=' + token;
        axios.delete('/cart/' + orderId + '.json' + queryParams)
            .then(res => {
                dispatch(deleteCartOrderSuccess(orderId));
            })
            .catch(error => {
                dispatch(deleteCartOrderFail(error));
            });
    }
}

const deleteCartOrderStart = () => {
    return {
        type: actionTypes.DELETE_CART_ORDER_START,
    }
}

const deleteCartOrderSuccess = (orderId) => {
    return {
        type: actionTypes.DELETE_CART_ORDER_SUCCESS,
        orderId: orderId
    }
}

const deleteCartOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_CART_ORDER_FAIL,
        error: error
    }
}

export const orderFromCart = (token, order) => {
    return dispatch => {
        dispatch(orderFromCartStart());
        axios.post('/orders.json?auth=' + token, order)
            .then(response => {
                dispatch(orderFromCartSuccess(response.data.name, order));
            } )
            .catch(error => {
                dispatch(orderFromCartFail(error));
            } );
    };
};

export const orderFromCartStart = () => {
    return {
        type: actionTypes.ORDER_FROM_CART_START
    }
}

export const orderFromCartSuccess = (id, order) => {
    return {
        type: actionTypes.ORDER_FROM_CART_SUCCESS,
        orderId: id,
        order: order
    };
};

export const orderFromCartFail = (error) => {
    return {
        type: actionTypes.ORDER_FROM_CART_FAIL,
        error: error
    };
};