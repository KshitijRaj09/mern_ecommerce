import * as cartActions from '../actionTypes';

const initialState = {
  cart: null,
  loading: false,
  cartCount: 0,
};

const cartReducer = (state = initialState, { type, payload }) => {
  let totalCartCount = 0;
  if (payload) {
    const { items = [] } = payload;
    totalCartCount = items.reduce((total, item) => total + item.quantity, 0);
  }
  switch (type) {
    case cartActions.GET_CART:
      return {
        ...state,
        cart: payload,
        cartCount: totalCartCount,
        loading: false,
      };
    case cartActions.ADD_TO_CART:
      return {
        ...state,
        cartCount: totalCartCount,
        cart: payload,
      };
    case cartActions.DELETE_FROM_CART:
      return {
        ...state,
        cartCount: totalCartCount,
        cart: payload,
      };
    case cartActions.CART_LOADING:
      return {
        ...state,
        loading: true,
      };
    case cartActions.CLEAR_CART: {
      return {
        ...state,
        ...initialState,
      };
    }
    case cartActions.CART_COUNT: {
      let quantity = 0;
      for (let key in payload) {
        quantity += payload[key];
      }
      return {
        ...state,
        cartCount: quantity,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
