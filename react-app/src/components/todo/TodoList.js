import React, { useState } from "react";
import Todo from "./Todo";
import selectListTodos from "../../redux/selectors/todoSelector";
import store from "../../redux/store";

function TodoList() {

    const [todos, updateTodos] = useState(selectListTodos());

    const todoList = todos.map((item, index) =>
        <Todo key={index} todo={item} />
    );

    const updateList = () =>
        store.subscribe(() => updateTodos(selectListTodos()));

    updateList();

    return (
        <ul>
            {todoList}
        </ul>
    );
};

export default TodoList;
