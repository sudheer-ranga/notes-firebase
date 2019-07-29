import React, { useContext, useState, useEffect } from 'react';
import './App.scss';
import TodoList from '../TodoList';
import { TodoListContext } from './../../TodoListStore';
import zeroList from './../../images/list-zero-state.svg';
import firebase from './../../firebase';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [appState, doAction] = useContext(TodoListContext);
  const list = appState.list;

  useEffect(() => {
    let items = localStorage.getItem('notes');
    items = (items && JSON.parse(items)) || [];

    // if (items.length === 0) {
    setIsLoading(true);

    const unsubscribe = firebase.db
      .collection('todo_notes')
      .onSnapshot(snapshot => {
        let notes = snapshot.docs.map(doc => {
          let docData = doc.data();
          docData.docId = doc.id;

          return docData;
        });

        doAction({
          type: 'SET_LOCALSTORAGE',
          payload: notes
        });

        setIsLoading(false);
      });

    return () => unsubscribe();
    // }
  }, []);

  return (
    <div className="app">
      {!isLoading ? (
        <div className="container">
          {list.length > 0 ? (
            <TodoList />
          ) : (
            <div className="zero-state-list text-center">
              <p>
                You don't have any notes yet. Click on <strong>Add Note</strong>{' '}
                at the bottom to create your first note.
              </p>
              <img src={zeroList} alt="" />
            </div>
          )}
        </div>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};

export default App;
