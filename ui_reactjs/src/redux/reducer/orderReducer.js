import * as orderActions from "../actionTypes";

const initialState = {
    orders: [],
    loading: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderActions.GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case orderActions.CHECKOUT:
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }
        case orderActions.ORDERS_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state;
    }
}

export default orderReducer;