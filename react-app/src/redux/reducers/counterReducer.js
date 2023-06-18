import { DECREMENTED, INCREMENTED } from "../actionTypes";

const initialState = {
    value: 0
}

// (state, action) => newState
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENTED:
            return {
                ...state,
                value: state.value + 1
            };
        case DECREMENTED:
            return {
                ...state,
                value: state.value - 1
            };
        default:
            return state;
    }
}

export default counterReducer;

