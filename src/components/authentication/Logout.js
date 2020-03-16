import React from 'react';
import firebase from '../../firebase/config';

const Logout = () => (
  <button type="button" onClick={() => firebase.auth().signOut()}>
    Log Out
  </button>
);

export default Logout;