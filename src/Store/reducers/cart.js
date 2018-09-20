import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    cartCount: 0,
    totalCartPrice: 0
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADD_TO_CART_SUCCESS:
            const newOrder = {
                ...action.order,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                cartCount: state.cartCount + 1,
                totalCartPrice: state.totalCartPrice + newOrder.price,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.ADD_TO_CART_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.FETCH_CART_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_CART_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                cartCount: action.cartCount,
                totalCartPrice: action.totalCartPrice,
                loading: false
            };
        case actionTypes.FETCH_CART_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_CART_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_CART_ORDER_SUCCESS:
            const updated_Orders = state.orders;
            const index =  updated_Orders.findIndex( order => { return order.id === action.orderId})
            const deletedOrderPrice = updated_Orders[index].price;
            const updated_Order = updated_Orders.filter(order => order.id !== action.orderId )
            return {
                ...state,
                cartCount: state.cartCount - 1,
                totalCartPrice: state.totalCartPrice - deletedOrderPrice,
                orders: updated_Order,
                loading: false
            }
        case actionTypes.DELETE_CART_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
};

export default reducer;