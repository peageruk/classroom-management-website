import React from "react";
import { connect } from "react-redux";
import addTodoAction from "../redux/actionCreators/todoActionCreator";

class AddTodoButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    updateInput = event => {
        this.setState({
            input: event.target.value
        });
    };

    handleAddTodo = () => {
        this.props.addTodoAction(this.state.input);
        this.setState({
            input: ""
        });
    };

    render() {
        return (
            <div>
                <input
                    onChange={this.updateInput}
                    value={this.state.input} />

                <button onClick={this.handleAddTodo}>
                    Add Todo
                </button>
            </div>
        );
    }
}

export default connect(null, { addTodoAction })(AddTodoButton)
