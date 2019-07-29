import React, { useContext } from 'react';
import './TodoItem.scss';
import close from '../../images/close.svg';
import firebase from './../../firebase';
import { TodoListContext } from './../../TodoListStore';

const TodoItem = props => {
  const [appState, doAction] = useContext(TodoListContext);
  const { todo } = props;

  const removeItemFromNote = itemId => {
    const filteredTodos = todo.todos.filter((item, index) => {
      if (item.id === itemId) {
        // if (note.todos.length === 0) {
        //   deleteNote(state, action.payload.parentId);
        // }

        return false;
      }

      return true;
    });

    firebase.db
      .collection('todo_notes')
      .doc(todo.docId)
      .update({
        todos: filteredTodos
      });
  };

  const toggleComplete = itemId => {
    const updateCompletedTodo = todo.todos.map((item, index) => {
      if (item.id === itemId) {
        item.completed = !item.completed;
      }

      return item;
    });

    firebase.db
      .collection('todo_notes')
      .doc(todo.docId)
      .update({
        todos: updateCompletedTodo
      });
  };

  const addItemToNotes = event => {
    if (!event.target.value) {
      return;
    }

    if (event.key === 'Enter') {
      const newTodoItem = {
        id: new Date().getTime(),
        parentId: todo.id,
        docId: todo.docId,
        description: event.target.value,
        completed: false
      };

      firebase.db
        .collection('todo_notes')
        .doc(todo.docId)
        .update({
          todos: firebase.firestore.FieldValue.arrayUnion(newTodoItem)
        })
        .then(res => {
          doAction({
            type: 'ADD_ITEM_TO_NOTE',
            payload: newTodoItem
          });
        });

      event.target.value = '';
    }
  };

  const removeNote = () => {
    firebase.db
      .collection('todo_notes')
      .doc(todo.docId)
      .delete();
    // .then(res => {
    //   doAction({
    //     type: 'DELETE_NOTE',
    //     payload: todo.id
    //   });
    // });
  };

  return (
    <div className="notes-item-block">
      <div className="title-block">
        <h3 className="title">{todo.title}</h3>
        <span className="close-block" onClick={removeNote}>
          <img src={close} alt="" />
        </span>
      </div>

      <div className="todo-items">
        {todo.todos.length > 0 &&
          todo.todos.map(item => {
            return (
              <div className="todo-item" key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={e => toggleComplete(item.id)}
                    checked={item.completed}
                    required
                  />
                  <div className="checkbox-icon">
                    <span className="checkbox-bg" />
                  </div>
                  <span className="item-description">{item.description}</span>
                </label>

                <span
                  className="btn-remove"
                  onClick={e => removeItemFromNote(item.id)}
                >
                  Remove
                </span>
              </div>
            );
          })}
      </div>

      <div className="todo-item new-item">
        <input type="text" placeholder="Add Item" onKeyDown={addItemToNotes} />
      </div>
    </div>
  );
};

export default TodoItem;
