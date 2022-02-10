import * as orderActions from "../actionTypes";
import { showError } from "./errorActions";
import axios from 'axios';

export const getOrder = (userId) => async (dispatch, getState) => {
    dispatch(setOrderLoading());
    try {
        const { data } = await axios.get(`/api/order/${userId}`);
        dispatch({ type: orderActions.GET_ORDERS, payload: data });
    }
    catch ({ response }) {
        dispatch(showError(response.data, response.status));
    }
}

export const checkout = (userId, source) => async (dispatch, getState) => {

    try {
        const { data } = await axios.post(`/api/order/${userId}`, { source });
        dispatch({ type: orderActions.CHECKOUT, payload: data });
    }
    catch ({ response }) {
        dispatch(showError(response.data, response.status));
    }
}

export const setOrderLoading = () => {
    return {
        type: orderActions.ORDERS_LOADING
    }
}