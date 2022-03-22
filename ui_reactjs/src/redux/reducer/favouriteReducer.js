import { favouriteLoadFromLocalStorage } from '../../util/loadLocalStorage';
import * as favouriteActions from '../actionTypes';

const initialState = {
  favourite: favouriteLoadFromLocalStorage(),
};

const favouriteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case favouriteActions.ADD_TO_FAVOURITE: {
      const { _id } = payload;
      return { ...state, favourite: { ...state.favourite, [_id]: payload } };
    }
    case favouriteActions.REMOVE_FROM_FAVOURITE: {
      return {
        ...state,
        favourite: { ...payload },
      };
    }
    default: {
      return state;
    }
  }
};

export default favouriteReducer;
