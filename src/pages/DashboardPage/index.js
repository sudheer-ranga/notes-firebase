import React from 'react';
import App from './../../components/App';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import firebase from './../../firebase';
import { withRouter } from 'react-router-dom';

const DashboardPage = props => {
  if (!firebase.getCurrentUsername()) {
    props.history.replace('/login');
    return null;
  }

  return (
    <React.Fragment>
      <Header />
      <App />
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(DashboardPage);
