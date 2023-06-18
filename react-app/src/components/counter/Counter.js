import { useState } from "react";
import { decrementedAction, incrementedAction } from "../../redux/actionCreators/counterActionCreator";
import selectCounter from "../../redux/selectors/counterSelector";
import store from "../../redux/store";

function Counter() {

    const [counter, setCounter] = useState(selectCounter());

    const increase = () => {
        store.dispatch(incrementedAction());
    }

    const decrease = () => {
        store.dispatch(decrementedAction());
    }

    const updateData = () => {
        store.subscribe(() => setCounter(selectCounter()));
    };

    updateData();

    return (
        <div>
            <p>Value: {counter}</p>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    )
}

export default Counter;

