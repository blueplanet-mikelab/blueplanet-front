// import React, { useEffect, useState } from 'react';
// import firebase from '../firebase/config';
// import axios from 'axios';

// const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

// const auth = firebase.auth()
// const providers = {
//   facebook: new firebase.auth.FacebookAuthProvider(),
//   google: new firebase.auth.GoogleAuthProvider()
// }

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged(setCurrentUser);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const signUpWithEmailAndPassword = async (newUser) => {
//   const signUp = await auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
//   const currentUser = auth.currentUser

//   currentUser.updateProfile({ displayName: newUser.displayName })
//     .then(async () => {
//       axios.post(`http://${backend_url}/api/users/signup`, currentUser, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': await currentUser
//             .getIdToken(true)
//             .then((idToken) => {
//               return idToken
//             })
//         }
//       })
//         .then(() => {
//           return signUp
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     })
// }

// export const signInWithFacebook = async () => {
//   return await auth.signInWithPopup(providers.facebook)
// }

// export const signInWithGoogle = async () => {
//   return await auth.signInWithPopup(providers.google)
// }

// export const signInWithEmailAndPassword = async (email, password) => {
//   return await auth.signInWithEmailAndPassword(email, password)
// }

// export const sendPasswordResetEmail = async (email) => {
//   return await auth.sendPasswordResetEmail(email)
// }

// export const signOut = async () => {
//   return await auth.signOut()
// }

// export const getTriplists = async () => {
//   return await auth.currentUser
//     .getIdToken(true)
//     .then(async (idToken) => {
//       return await axios
//         .get(`http://${backend_url}/api/my-triplist/triplists`, {
//           headers: {
//             'Authorization': idToken
//           }
//         })
//         .then((result) => {
//           return result.data
//         })
//     })
// }

// <<<<<<< HEAD
// export const addThreadIntoTrip = async (trip, id) => {
// =======
// export const getFavoriteBool = async (threadId) => {
// >>>>>>> dev
//   return await auth.currentUser
//     .getIdToken(true)
//     .then(async (idToken) => {
//       return await axios
// <<<<<<< HEAD
//         .put(`http://${backend_url}/api/my-triplist/triplists/${trip}/add/${id}`, {}, {
// =======
//         .get(`http://${backend_url}/api/my-triplist/favorites/check/${threadId}`, {
// >>>>>>> dev
//           headers: {
//             'Authorization': idToken
//           }
//         })
// <<<<<<< HEAD
//     }).catch(function (error) {
//       console.log(error)
//     });
// }

// export const onHeartFavoriteClick = async (id) => {
//   console.log("id in trip: " + id)
// =======
//         .then((response) => {
//           return response.data
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     })
// }

// export const putFavorite = async (threadId) => {
// >>>>>>> dev
//   return await auth.currentUser
//     .getIdToken(true)
//     .then(async (idToken) => {
//       return await axios
// <<<<<<< HEAD
//         .put(`http://${backend_url}/api/my-triplist/favorites/${id}`, {}, {
// =======
//         .put(`http://${backend_url}/api/my-triplist/favorites/${threadId}`, {}, {
// >>>>>>> dev
//           headers: {
//             'Authorization': idToken
//           }
//         })
// <<<<<<< HEAD
//     }).catch(function (error) {
//       console.log(error)
//     });
// }

// export const addRecentlyView = async (id) => {
// =======
//         .then((response) => {
//           return response.data.message
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     })
// }

// export const deleteFavorite = async (threadId) => {
// >>>>>>> dev
//   return await auth.currentUser
//     .getIdToken(true)
//     .then(async (idToken) => {
//       return await axios
// <<<<<<< HEAD
//         .put(`http://${backend_url}/api/my-triplist/recently-viewed/${id}`, {}, {
// =======
//         .delete(`http://${backend_url}/api/my-triplist/favorites/${threadId}`, {
// >>>>>>> dev
//           headers: {
//             'Authorization': idToken
//           }
//         })
// <<<<<<< HEAD
//     }).catch(function (error) {
//       console.log(error)
//     });
// =======
//         .then((response) => {
//           return response.data.message
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     })
// >>>>>>> dev
// }

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

export const getTriplists = async () => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .get(`http://${backend_url}/api/my-triplist/triplists`, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((result) => {
          return result.data
        })
    })
}

export const addThreadIntoTrip = async (trip, id) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .put(`http://${backend_url}/api/my-triplist/triplists/${trip}/add/${id}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}

export const onHeartFavoriteClick = async (id) => {
  console.log("id in trip: " + id)
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .put(`http://${backend_url}/api/my-triplist/favorites/${id}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}

export const addRecentlyView = async (id) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .put(`http://${backend_url}/api/my-triplist/recently-viewed/${id}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}