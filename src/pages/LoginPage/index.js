import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import firebase from './../../firebase';
import { withRouter } from 'react-router-dom';

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await firebase.login(email, password);

      setIsLoading(false);
      props.history.replace('/');
    } catch (error) {
      setIsLoading(false);
      console.log('Login Error: ', error);
    }
  };

  return (
    <div className="login-wrapper">
      {!isLoading ? (
        <div className="login-center-block text-center">
          <label className="input-block">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label className="input-block">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-login" onClick={login}>
            Login
          </button>

          <div className="page-link-block">
            <Link className="page-link" to="/register">
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};

export default withRouter(LoginPage);
