import React, { useState, useEffect } from 'react';
import './Root.scss';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import DashboardPage from '../../pages/DashboardPage';
import { TodoListStore } from '../../TodoListStore';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from '../../firebase';

function RootApp() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <Router>
      <Switch>
        <TodoListStore>
          <Route exact path="/" component={DashboardPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </TodoListStore>
      </Switch>
    </Router>
  ) : (
    <div id="loader">
      <div className="loader" />
    </div>
  );
}

export default RootApp;
