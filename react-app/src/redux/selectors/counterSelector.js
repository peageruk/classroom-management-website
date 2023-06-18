import store from "../store";

const selectCounter = () => {
    return store.getState().counter.value;
}

export default selectCounter;

