import * as itemActions from "../actionTypes";

const initialState = {
    items: [],
    loading: false
}

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case itemActions.GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case itemActions.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case itemActions.DELETE_ITEM:
            const deletedItem = action.payload;
            let updatedItemList = state.items.filter(p => p._id !== deletedItem);
            return {
                ...state,
                items: updatedItemList
            }
        case itemActions.UPDATE_ITEM:
            const [id, data] = action.payload;
            const updatedItem = id;
            updatedItemList = state.items.map(p => {
                if (p._id === updatedItem)
                    p = data;
                return p;
            })
            return {
                ...state,
                items: updatedItemList
            }
        case itemActions.ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export default itemReducer;