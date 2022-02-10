import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];
const composedEnhancer = compose(
    // EXAMPLE: Add whatever middleware you actually want to use here
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // other store enhancers if any
)

const store = createStore(rootReducer, initialState, composedEnhancer);
export default store;