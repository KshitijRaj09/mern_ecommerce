import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import itemReducer from './itemReducer';
import orderReducer from './orderReducer';
import favouriteReducer from './favouriteReducer';

export default combineReducers({
  authReducer,
  cartReducer,
  errorReducer,
  itemReducer,
  orderReducer,
  favouriteReducer,
});
