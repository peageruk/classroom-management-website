import { ADD_TODO } from "../actionTypes";

const addTodoAction = todo => {
    return {
        type: ADD_TODO,
        payload: todo
    };
};

export default addTodoAction;