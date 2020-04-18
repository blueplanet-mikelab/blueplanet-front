import firebase from './config';
import axios from 'axios';

const auth = firebase.auth()
const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider()
}

async function signInWithFacebook() {
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

async function signInWithGoogle() {
  return await auth.signInWithPopup(providers.google)
}

export {
  signInWithFacebook, signInWithGoogle
}