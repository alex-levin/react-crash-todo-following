import React, { Component } from 'react';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Dinner with wife',
        completed: true
      },
      {
        id: 3,
        title: 'Meeting with boss',
        completed: false
      }     
    ]
  };

  // Toggling state at the top parent component and bringing state chages down to
  // the child components.
  markComplete = id => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        // todo.completed = todo.completed === true ? false : true;
        todo.completed = !todo.completed;
      }
      return todo;
    }) });
  }

  // Delete Todo
  // ... is a spread operator
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // It creates a new copy of the array
  // var arr2 = [...arr]; // like arr.slice()
  // We are filtering out one todo and creating a new copy of the array
  delTodo = id => {
    this.setState({ todos: [...this.state.todos.filter(todo => 
      todo.id !== id)]
    });
  }

  // Add Todo
  addTodo = (title) => {
    const newTodo = {
      // generate random id
      id: uuid.v4(),
      // this is the same as title: title in ES6
      title,
      completed: false
    }
    // spread operator - makes a copy first and then adds newTodo to the new copy
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  render() {
    return (
      <div className="App">
      	<div className="container">
          <Header />
          <AddTodo addTodo={this.addTodo} />
        	<Todos todos={this.state.todos} markComplete={this.markComplete} 
          	delTodo={this.delTodo} />
      	</div>
      </div>
    );
  }
}

export default App;
