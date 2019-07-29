import React, { useReducer, createContext } from 'react';
import firebase from './firebase';

export const TodoListContext = createContext();

const setLocalstorage = updatedList => {
  localStorage.setItem('notes', JSON.stringify(updatedList));
};

const deleteNote = (state, payload) => {
  state.list.some((note, index) => {
    if (note.id === payload) {
      state.list.splice(index, 1);

      return true;
    }

    return false;
  });

  setLocalstorage(state.list);
};

const reducer = (state, action) => {
  switch (action.type) {
    // case 'ADD_NOTE':
    //   state.list.push(action.payload);
    //   console.log('state: ', state);
    //   return { ...state };

    // case 'DELETE_NOTE':
    //   deleteNote(state, action.payload);
    //   return { ...state };

    // case 'ADD_ITEM_TO_NOTE':
    // state.list.some(note => {
    //   if (note.id === action.payload.parentId) {
    //     note.todos.push(action.payload);

    //     return true;
    //   }

    //   return false;
    // });
    // setLocalstorage(state.list);
    // return { ...state };

    // case 'DELETE_ITEM_FROM_NOTE':
    //   state.list.some(note => {
    //     if (note.id === action.payload.parentId) {
    //       note.todos.some((item, index) => {
    //         if (item.id === action.payload.itemId) {
    //           note.todos.splice(index, 1);

    //           if (note.todos.length === 0) {
    //             deleteNote(state, action.payload.parentId);
    //           }

    //           return true;
    //         }

    //         return false;
    //       });

    //       return true;
    //     }

    //     return false;
    //   });

    //   setLocalstorage(state.list);

    //   return { ...state };

    // case 'TOGGLE_COMPLETE':
    //   state.list.some(note => {
    //     if (note.id === action.payload.parentId) {
    //       note.todos.some(item => {
    //         if (item.id === action.payload.itemId) {
    //           item.completed = !item.completed;
    //           return true;
    //         }

    //         return false;
    //       });

    //       return true;
    //     }

    //     return false;
    //   });

    //   setLocalstorage(state.list);

    //   return { ...state };

    case 'SET_LOCALSTORAGE':
      setLocalstorage(action.payload);
      return { ...state, list: action.payload };

    case 'GET_LOCALSTORAGE':
      const items = JSON.parse(localStorage.getItem('notes'));
      return { ...state, list: items };

    case 'CLEAR_LOCALSTORAGE':
      localStorage.removeItem('notes');
      return { ...state, list: [] };

    default:
      return state;
  }
};

const getNotesFromLocalStorage = () => {
  if (localStorage && localStorage.getItem) {
    let notes = localStorage.getItem('notes');
    notes = JSON.parse(notes) || [];

    return notes;
  }

  return [];
};

export const TodoListStore = props => {
  let stateHooks = useReducer(reducer, {
    list: getNotesFromLocalStorage()
  });

  return (
    <TodoListContext.Provider value={stateHooks}>
      {props.children}
    </TodoListContext.Provider>
  );
};
