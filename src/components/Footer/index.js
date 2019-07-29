import React, { useState, useContext } from 'react';
import './Footer.scss';
import { TodoListContext } from './../../TodoListStore';
import firebase from './../../firebase';

const Footer = () => {
  const [appState, doAction] = useContext(TodoListContext);
  const [isNoteToggled, setIsNoteToggled] = useState(false);
  const [title, setTitle] = useState('');

  const toggleAddNotes = () => {
    setIsNoteToggled(!isNoteToggled);
  };

  const addNewNoteByEnter = event => {
    if (event.key === 'Enter') {
      addNewNote(event);
    }
  };

  const addNewNote = event => {
    event.preventDefault();
    if (!title) {
      return;
    }

    let newNote = {
      id: new Date().getTime(),
      title: title,
      todos: []
    };

    firebase.db.collection('todo_notes').add(newNote);
    setTitle('');
  };

  return (
    <footer className="footer text-center">
      {isNoteToggled ? (
        <form name="addNoteForm">
          <input
            type="text"
            placeholder="Enter Title for Note"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={addNewNoteByEnter}
            required
          />
          <button className="btn btn-create-note" onClick={addNewNote}>
            Submit
          </button>
          <button className="btn btn-cancel" onClick={toggleAddNotes}>
            Cancel
          </button>
        </form>
      ) : (
        <button className="btn btn-add-note" onClick={toggleAddNotes}>
          <span>+</span>
          <span>Add Note</span>
        </button>
      )}
    </footer>
  );
};

export default Footer;
