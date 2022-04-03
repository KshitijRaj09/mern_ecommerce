import axios from 'axios';
import { clearErrors, showError } from './errorActions';
import * as itemsAction from '../actionTypes';

export const getItems =
  (term = '', pageNumber = 0) =>
  async (dispatch) => {
    dispatch(setItemsLoading());
    try {
      const { data, status } = await axios.get(
        `/api/items?term=${term}&pageNumber=${pageNumber}`
      );
      dispatch(clearErrors());
      const { hasMoreData, products } = data;
      dispatch({
        type: itemsAction.GET_ITEMS,
        payload: { products, hasMoreData },
      });
    } catch (error) {
      dispatch(showError(error.response.data, error.response.status));
    }
  };

export const getItemsOnScroll =
  (term = '', pageNumber = 1) =>
  async (dispatch) => {
    // dispatch(setItemsLoading())
    try {
      const { data, status } = await axios.get(
        `/api/itemsOnScroll?term=${term}&pageNumber=${pageNumber}`
      );
      const { products, hasMoreData } = data;
      dispatch({
        type: itemsAction.GET_ITEMS_ON_SCROLL,
        payload: { products, hasMoreData },
      });
    } catch (error) {
      dispatch(showError(error.response.data, error.response.status));
    }
  };

export const addItem = (item) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/items', item);
    dispatch({ type: itemsAction.ADD_ITEM, payload: data });
  } catch ({ response }) {
    dispatch(showError(response.data, response.status));
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/items/${id}`);
    dispatch({ type: itemsAction.DELETE_ITEM, payload: id });
  } catch ({ response }) {
    dispatch(showError(response.data, response.status));
  }
};

export const updateItem = (id, item) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/items${id}`, item);
    dispatch({ type: itemsAction.UPDATE_ITEM, payload: [id, data] });
  } catch ({ response }) {
    dispatch(showError(response.data, response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: itemsAction.ITEMS_LOADING,
  };
};
