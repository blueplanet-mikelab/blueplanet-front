import React, { useEffect, useState } from 'react';
import firebase from '../firebase/config';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const auth = firebase.auth()
const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider()
}

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const signUpWithEmailAndPassword = async (newUser) => {
  const signUp = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
  const currentUser = auth.currentUser

  currentUser.updateProfile({ displayName: newUser.displayName })
    .then(async () => {
      axios.post(`http://${backend_url}/api/users/signup`, currentUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': await currentUser
            .getIdToken(true)
            .then((idToken) => {
              return idToken
            })
        }
      })
        .then(() => {
          return signUp
        })
        .catch((error) => {
          console.log(error)
        })
    })
}

export const signInWithFacebook = async () => {
  return await auth.signInWithPopup(providers.facebook)
    .then((socialAuthUser) => {
      // var token = socialAuthUser.credential.accessToken;
      // auth
      //   .user(socialAuthUser.user.uid)
      //   .set({
      //     username: socialAuthUser.additionalUserInfo.profile.name,
      //     email: socialAuthUser.additionalUserInfo.profile.email
      //   })
    })
}

export const signInWithGoogle = async () => {
  return await auth.signInWithPopup(providers.google)
}

export const signInWithEmailAndPassword = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password)
}

export const sendPasswordResetEmail = async (email) => {
  return await auth.sendPasswordResetEmail(email)
}

export const signOut = async () => {
  return await auth.signOut()
}