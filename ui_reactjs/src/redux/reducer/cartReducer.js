import * as cartActions from "../actionTypes";

const initialState = {
    cart: null,
    loading: false
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case cartActions.GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        case cartActions.ADD_ITEM:
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
        default:
            return state;
    }
}

export default cartReducer;