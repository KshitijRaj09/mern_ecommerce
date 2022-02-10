import * as cartAction from "../actionTypes";
import axios from "axios";
import { showError } from "../actions/ErrorActions";


export const setCartLoading = () => {
    return {
        type: cartAction.CART_LOADING
    }
}

export const addToCart = (userId, productId, quantity) => async (dispatch, getState) => {
    const body = JSON.stringify({ productId, quantity });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const { data } = await axios.post(`/api/cart/${userId}`, body, config);
        dispatch({ type: cartAction.ADD_TO_CART, payload: data })
    }
    catch ({ response }) {
        dispatch(showError(response.data, response.status));
    }
}

export const getCart = (id) => async (dispatch, getState) => {
    dispatch(setCartLoading());

    try {
        const { data } = await axios.get(`/api/cart/${id}`);
        dispatch({ type: cartAction.GET_CART, payload: data });
    }
    catch ({ response }) {
        dispatch(showError(response.data, response.status));
    }
}

export const deleteCartItem = (userId, productId) => async (dispatch, getState) => {

    try {
        const { data } = await axios.delete(`/api/cart/${userId}/${productId}`);
        dispatch({ type: cartAction.DELETE_FROM_CART, payload: data });
    }
    catch ({ response }) {
        dispatch(showError(response.data, response.status));
    }
}
