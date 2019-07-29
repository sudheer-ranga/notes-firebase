import React, { useState } from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import firebase from './../../firebase';
import { withRouter } from 'react-router-dom';

const RegisterPage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    if (!name || !email || !password) {
      return;
    }

    setIsLoading(true);

    try {
      await firebase.register(name, email, password);
      setIsLoading(false);
      props.history.replace('/');
    } catch (error) {
      setIsLoading(false);
      console.log('Register Error: ', error);
    }
  };

  return (
    <div className="register-wrapper">
      {!isLoading ? (
        <div className="register-center-block">
          <label className="input-block">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
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
          <button className="btn btn-login" onClick={register}>
            Register
          </button>

          <div className="page-link-block">
            <Link className="page-link" to="/login">
              Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};

export default withRouter(RegisterPage);
