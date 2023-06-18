import React from 'react';
import AddTodoButton from './components/todo/AddTodoButton';
import Counter from './components/counter/Counter';
import TodoList from './components/todo/TodoList';

class App extends React.Component {
  render() {
    return (
      <div>
        <Counter />
        <AddTodoButton />
        <TodoList />
      </div>
    );
  }
}

export default App;

