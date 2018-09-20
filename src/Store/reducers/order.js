import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    orderStatus: 'New Order',
    purchased: false,
    burgerType: null
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_ORDER_SUCCESS:
            const updated_Orders = state.orders;
            const updated_Order = updated_Orders.filter(order => order.id !== action.orderId )
            return {
                ...state,
                orders: updated_Order,
                loading: false
            }
        case actionTypes.DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.UPDATE_ORDER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.UPDATE_ORDER_SUCCESS:
            const updatedOrders = state.orders;
            const index = updatedOrders.findIndex( order => { return order.id === action.orderId});
            updatedOrders[index].status = action.status; 
            return {
                ...state,
                orderStatus: action.status,
                orders: updatedOrders,
                loading: false
            }
        case actionTypes.UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
};

export default reducer;