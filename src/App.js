import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    // todos: [
    //   {
    //     id: 1,
    //     title: 'take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: 2,
    //     title: 'Dinner with wife',
    //     completed: true
    //   },
    //   {
    //     id: 3,
    //     title: 'Meeting with boss',
    //     completed: false
    //   }     
    // ]

      todos: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

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
    // this.setState({ todos: [...this.state.todos.filter(todo => 
    //   todo.id !== id)]

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // Add Todo
  addTodo = (title) => {
    // const newTodo = {
    //   // generate random id
    //   id: uuid.v4(),
    //   // this is the same as title: title in ES6
    //   title,
    //   completed: false
    // };
    
    // // spread operator - makes a copy first and then adds newTodo to the new copy
    // this.setState({ todos: [...this.state.todos, newTodo] });

    axios.post('https://jsonplaceholder.typicode.com/todos', {  
      title,
      completed: false
    })
    // spread operator
    .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }

  // render() {
  //   return (
  //     <div className="App">
  //     	<div className="container">
  //         <Header />
  //         <AddTodo addTodo={this.addTodo} />
  //       	<Todos todos={this.state.todos} markComplete={this.markComplete} 
  //         	delTodo={this.delTodo} />
  //     	</div>
  //     </div>
  //   );
  // }

  // Added Router
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>  
        </div>
      </Router>
    );
  }  
}

export default App;
