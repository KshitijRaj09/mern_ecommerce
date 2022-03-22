import axios from 'axios';
import { clearErrors, showError } from './errorActions';
import * as itemsAction from '../actionTypes';

export const getItems =
  (term = '') =>
  async (dispatch) => {
    dispatch(setItemsLoading());
    try {
      const { data, status } = await axios.get(`/api/items?term=${term}`);
      dispatch(clearErrors());
      dispatch({ type: itemsAction.GET_ITEMS, payload: data.products });
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
