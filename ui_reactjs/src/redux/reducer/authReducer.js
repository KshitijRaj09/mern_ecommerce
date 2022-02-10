import * as userActions from "../actionTypes";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.USER_LOADING:
            return {
                ...state, isLoading: true
            };
        case userActions.USER_LOADED:
            return {
                ...state, isAuthenticated: true, isLoading: false, user: action.payload
            }
        case userActions.LOGIN_SUCCESS:
        case userActions.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            }
        case userActions.AUTH_ERROR:
        case userActions.LOGIN_FAIL:
        case userActions.LOGOUT_SUCCESS:
        case userActions.REGISTER_FAIL:
            localStorage.removeItem('token');
            console.log("register fail")
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}

export default userReducer;