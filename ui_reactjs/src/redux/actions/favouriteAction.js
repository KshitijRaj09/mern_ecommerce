import {
  favouriteLoadFromLocalStorage,
  favouriteSetToLocalStorage,
} from '../../util/loadLocalStorage';
import * as favouriteActions from '../actionTypes';

export const addToFavourite = (item) => (dispatch) => {
  const { _id } = item;
  let favouriteInLocalStorage = favouriteLoadFromLocalStorage();
  favouriteSetToLocalStorage(favouriteInLocalStorage, _id, item);
  dispatch({ type: favouriteActions.ADD_TO_FAVOURITE, payload: item });
};

export const removeFromFavourite = (itemId) => (dispatch) => {
  let favouriteInLocalStorage = favouriteLoadFromLocalStorage();

  const { [itemId]: temp, ...rest } = favouriteInLocalStorage;
  favouriteSetToLocalStorage(rest);

  dispatch({
    type: favouriteActions.REMOVE_FROM_FAVOURITE,
    payload: rest,
  });
};
