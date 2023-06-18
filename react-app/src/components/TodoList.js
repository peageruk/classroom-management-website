import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";

function TodoList(props) {
    const todoList = props.todos.map((item, index) =>
        <Todo key={index} todo={item} />
    );

    return (
        <ul>
            {todoList}
        </ul>
    );
};

const mapGlobalStateToProps = state => {
    return {
        todos: state.todo.todos
    };
};
export default connect(mapGlobalStateToProps)(TodoList);
