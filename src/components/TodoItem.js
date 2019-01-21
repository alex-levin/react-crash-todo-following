import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  // This is a property. No const, let, ot var
  getStyle = () => {
    // if(this.props.todo.completed) {
    //   return {
    //     textDecoration: 'line-through'
    //   }
    // }
    // else {
    //   return {
    //     textDecoration: 'none'
    //   }      
    // }
    console.log('in getStyle');
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none'
    }
  };

  // this custom method does not have access to _this_ because
  // it is an event handler and is not called explicitly like
  // ti = new TodoItem();
  // ti.markComplete();
  // we could do onChange={this.markComplete.bind(this)}  
  // markComplete(e) {
  //   console.log(this.props);
  // }
  
  // arrow function is a better way (no bind required)
  // since we are not using state manager like redux, we have to climb the tree
  // (called component drilling) from ToDoItem to ToDo to App
  // to change the App's one of the todo's completed property to true.
  // We have a state inside of the App parent component.
  // In other words, we need to change state of the parent component.
  // We will be using props to accomplish this.
  // this does not work and we cannot use
  // <input type='checkbox' onChange={this.markComplete} /> {' '} below  
  // markComplete = (e) => {
  //   console.log('clicked');
  //   this.props.todo.completed = true;
  //   this.render();
  // };

  render() {
    // Pulling out id and a title out of todo
    // This is called destructuring
    // id is this.props.todo.id and 
    // title is this.props.todo.title
    // In bind(this, id) this refers to App where markComplete function is defined
    // and where it can change state.
    const { id, title } = this.props.todo;
    return (
      // <div style={{ backgroundColor: '#f4f4f4'}}>
      // <div style={itemStyle}>
      <div style={ this.getStyle() }>
        <p>
          <input type='checkbox' onChange={this.props.markComplete.bind(this, id)} /> {' '}
          { title }
          <button style={btnStyle} onClick={this.props.delTodo.bind(this, id)}>x</button>
        </p>
      </div>
    )
  }
}

// PropTypes
TodoItem.proptypes = {
  todo: PropTypes.object.isRequired
}

// const itemStyle = {
//   backgroundColor: '#f4f4f4'
// }

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

export default TodoItem
