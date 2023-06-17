import { useState } from "react";

function Counter() {
    const [counter, setCounter] = useState(0);

    const increase = () => {
        setCounter(prevCounter => prevCounter + 1)
    }

    const decrease = () => {
        setCounter(prevCounter => prevCounter - 1)
    }

    return (
        <div>
            <p>Value: {counter}</p>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    )
}

export default Counter;

