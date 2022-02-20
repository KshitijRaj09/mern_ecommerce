import * as cartActions from "../actionTypes";

const initialState = {
    cart: null,
    loading: false,
    cartCount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartActions.GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        case cartActions.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }
        case cartActions.DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload
            }
        case cartActions.CART_LOADING:
            return {
                ...state,
                loading: true
            }
        case cartActions.CART_COUNT:
            return {
                ...state,
                cartCount: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;