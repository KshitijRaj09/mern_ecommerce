import * as cartAction from "../actionTypes";
import axios from "axios";
import { showError } from "../actions/errorActions";


export const setCartLoading = () => {
    return {
        type: cartAction.CART_LOADING
    }
}

export const setCartCount = (totalCartCount) => {
    return {
        type: cartAction.CART_COUNT,
        payload: totalCartCount
    }
}

export const localStorageCartToDB = (userId) => async (dispatch) => {
    console.log('inside action local')
    let cartInLocalStorage = JSON.parse(localStorage.getItem('cartAdded')) || {};
    const body = cartInLocalStorage;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const { data } = await axios.post(`/api/cartLocalToDB/${userId}`, body, config);
        console.log(data);
    }
    catch ({ response }) {
        dispatch(showError(response.data, response.status));
    }

}

export const addToCart = (productId, quantity, userId = null, productName, price) => async (dispatch, getState) => {

    const body = JSON.stringify({ productId, quantity });
    if (userId) {
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
    else {
        console.log("Inside CartAction", productId, body);
        let cartInLocalStorage = JSON.parse(localStorage.getItem('cartAdded')) || {};
        if (quantity === 0) {
            const { [productId]: temp, ...rest } = cartInLocalStorage;
            cartInLocalStorage = rest;
            localStorage.setItem('cartAdded', JSON.stringify(rest));
        }
        else
            localStorage.setItem('cartAdded', JSON.stringify({ ...cartInLocalStorage, [productId]: quantity }));
    }
}

export const getCart = (id) => async (dispatch, getState) => {
    dispatch(setCartLoading());

    if (id) {
        try {
            const { data } = await axios.get(`/api/cart/${id}`);
            dispatch({ type: cartAction.GET_CART, payload: data });
        }
        catch ({ response }) {
            dispatch(showError(response.data, response.status));
        }
    }
    else {

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
