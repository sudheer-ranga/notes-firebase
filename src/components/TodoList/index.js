import React, { useContext } from 'react';
import './TodoList.scss';
import TodoItem from './../TodoItem';
import { TodoListContext } from './../../TodoListStore';

const TodoList = () => {
  const [appState] = useContext(TodoListContext);
  const list = appState.list;

  return (
    <div className="notes-container">
      {list.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default TodoList;
