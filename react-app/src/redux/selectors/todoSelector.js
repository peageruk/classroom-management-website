import store from "../store";

const selectListTodos = () => {
    return store.getState().todo.todos;
}

export default selectListTodos;

