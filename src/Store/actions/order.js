import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            } )
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrders = (token, userId, isAdmin) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        let queryParams ='';
        if(isAdmin) {
            queryParams = '?auth=' + token;
        }
        else {
            queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; 
        }
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
}

export const deleteOrder = (token, orderId) => {
    return dispatch => {
        dispatch(deleteOrderStart());
        const queryParams = '?auth=' + token;
        axios.delete('/orders/' + orderId + '.json' + queryParams)
            .then(res => {
                dispatch(deleteOrderSuccess(orderId));
            })
            .catch(error => {
                dispatch(deleteOrderFail(error));
            });
    }
}

const deleteOrderStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START,
    }
}

const deleteOrderSuccess = (orderId) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        orderId: orderId
    }
}

const deleteOrderFail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error: error
    }
}

export const updateOrder = (token, orderId, changedValue) => {
    return dispatch => {
        dispatch(updateOrderStart());
        const queryParams = '?auth=' + token;
        axios.patch('/orders/' + orderId + '.json' + queryParams, {status: changedValue})
            .then(res => {
                dispatch(updateOrderSuccess(changedValue, orderId));
            })
            .catch(error => {
                dispatch(updateOrderFail(error));
            });
    }
}

const updateOrderStart = () => {
    return {
        type: actionTypes.UPDATE_ORDER_START,
    }
}

const updateOrderSuccess = (changedValue, orderId) => {
    return {
        type: actionTypes.UPDATE_ORDER_SUCCESS,
        status: changedValue,
        orderId: orderId
    }
}

const updateOrderFail = (error) => {
    return {
        type: actionTypes.UPDATE_ORDER_FAIL,
        error: error
    }
}