import React from 'react';
import AddTodoButton from './components/AddTodoButton';
import TodoList from './components/TodoList';

class App extends React.Component {
  render() {
    return (
      <div>
        <AddTodoButton />
        <TodoList />
      </div>
    );
  }
}

export default App;

