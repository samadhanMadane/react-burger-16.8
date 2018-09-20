import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice: 20,
    error: false,
    building: false,
    veg: false,
    nonveg: false,
    quantity: 1,
    total: null
}

const INGREDIENT_PRICES = {
    salad:30,
    cheese:20,
    meat:60,
    bacon:35
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                total: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                total: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: initialState.totalPrice,
                total: initialState.totalPrice,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.ORDER_QUANTITY_CHANGED:
            
            return {
                ...state,
                quantity: action.quantity,
                total: state.totalPrice * action.quantity
            }
        default:
            return state
    }
} 

export default reducer;