import React, { useContext } from 'react';
import './Header.scss';
import { TodoListContext } from './../../TodoListStore';
import firebase from './../../firebase';
import { withRouter } from 'react-router-dom';

const Header = props => {
  const [appState, doAction] = useContext(TodoListContext);

  async function logout() {
    await firebase.logout();

    doAction({
      type: 'CLEAR_LOCALSTORAGE'
    });

    props.history.push('/');
  }

  return (
    <div className="container header">
      <div className="header-user-info text-center">
        <p>
          Welcome, <span>{firebase.getCurrentUsername()}!</span>
        </p>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
      <h1 className="app-heading text-center text-uppercase">Sticky Notes</h1>
    </div>
  );
};

export default withRouter(Header);
