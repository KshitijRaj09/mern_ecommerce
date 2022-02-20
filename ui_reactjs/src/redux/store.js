import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];
const composedEnhancer = composeWithDevTools(
    // EXAMPLE: Add whatever middleware you actually want to use here
    applyMiddleware(...middleware),
    // other store enhancers if any
)

const store = createStore(rootReducer, initialState, composedEnhancer);
export default store;