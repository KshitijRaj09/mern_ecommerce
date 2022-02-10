import * as errorActions from "../actionTypes";

const initialState = {
    msg: {},
    id: null,
    status: null
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case errorActions.GET_ERRORS:
            return {
                ...state,
                msg: action.payload.msg,
                id: action.payload.id,
                status: action.payload.status
            };
        case errorActions.CLEAR_ERRORS:
            return {
                ...state,
                msg: {},
                id: null,
                status: null
            };
        default:
            return state;
    }
}

export default errorReducer;