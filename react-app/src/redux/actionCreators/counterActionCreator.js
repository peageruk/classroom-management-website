import { DECREMENTED, INCREMENTED } from "../actionTypes";

export const incrementedAction = () => {
    return {
        type: INCREMENTED
    };
};

export const decrementedAction = () => {
    return {
        type: DECREMENTED
    };
};