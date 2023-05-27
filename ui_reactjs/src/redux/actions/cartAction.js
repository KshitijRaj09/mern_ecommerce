import * as cartAction from "../actionTypes";
import {showError} from "../actions/errorActions";
import {axiosInstance} from "../../api/axiosInstance";

export const setCartLoading = () => {
  return {
    type: cartAction.CART_LOADING,
  };
};

export const setCartCount = (totalCartCount) => {
  return {
    type: cartAction.CART_COUNT,
    payload: totalCartCount,
  };
};

export const localStorageCartToDB = (userId) => async (dispatch) => {
  let cartInLocalStorage = JSON.parse(localStorage.getItem("cartAdded")) || {};
  const body = cartInLocalStorage;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const {data} = await axiosInstance.post(
      `/api/cartLocalToDB/${userId}`,
      body,
      config
    );
    localStorage.removeItem("cartAdded");
  } catch ({response}) {
    dispatch(showError(response.data, response.status));
  }
};

export const addToCart =
  (productId, quantity, userId = null, productName, price) =>
  async (dispatch, getState) => {
    const body = JSON.stringify({productId, quantity});
    if (userId) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const {data} = await axiosInstance.post(
          `/api/cart/${userId}`,
          body,
          config
        );
        dispatch({type: cartAction.ADD_TO_CART, payload: data});
      } catch ({response}) {
        dispatch(showError(response.data, response.status));
      }
    } else {
      let cartInLocalStorage =
        JSON.parse(localStorage.getItem("cartAdded")) || {};
      if (quantity === 0) {
        const {[productId]: temp, ...rest} = cartInLocalStorage;
        cartInLocalStorage = rest;
        localStorage.setItem("cartAdded", JSON.stringify(rest));
      } else
        localStorage.setItem(
          "cartAdded",
          JSON.stringify({...cartInLocalStorage, [productId]: quantity})
        );

      dispatch({
        type: cartAction.CART_COUNT,
        payload: JSON.parse(localStorage.getItem("cartAdded")),
      });
    }
  };

export const getCart = (id) => async (dispatch, getState) => {
  dispatch(setCartLoading());

  if (id) {
    try {
      const {data} = await axiosInstance.get(`/api/cart/${id}`);
      dispatch({type: cartAction.GET_CART, payload: data});
    } catch ({response}) {
      dispatch(showError(response.data, response.status));
    }
  } else {
  }
};

export const deleteCartItem =
  (userId, productId) => async (dispatch, getState) => {
    try {
      const {data} = await axiosInstance.delete(
        `/api/cart/${userId}/${productId}`
      );
      dispatch({type: cartAction.DELETE_FROM_CART, payload: data});
    } catch ({response}) {
      dispatch(showError(response.data, response.status));
    }
  };
