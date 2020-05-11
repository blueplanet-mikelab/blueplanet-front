import React, { useContext } from 'react';
import firebase from '../firebase/config';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URL || 'localhost:30010'

const auth = firebase.auth()
const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider()
}

export const userContext = React.createContext({
  currentUser: null,
})

export const useSession = () => {
  return useContext(userContext)
}

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const currentUser = firebase.auth().currentUser
    return {
      initializing: !currentUser,
      currentUser,
    }
  })
  function onChange(currentUser) {
    setState({
      initializing: false,
      currentUser
    })
  }

  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
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

export const getRecentlyViewed = async () => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .get(`http://${backend_url}/api/my-triplist/recently-viewed`, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((result) => {
          return result.data
        })
        .catch((error) => {
          console.log(error)
        })
    })
}

export const getFavorite = async (page) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .get(`http://${backend_url}/api/my-triplist/favorites/${page}`, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((result) => {
          return result.data
        })
        .catch((error) => {
          console.log(error)
        })
    })
}

export const getFavoriteBool = async (threadId) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .get(`http://${backend_url}/api/my-triplist/favorites/check/${threadId}`, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    })
}

export const putFavorite = async (threadId) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .put(`http://${backend_url}/api/my-triplist/favorites/${threadId}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((response) => {
          return response.data.message
        })
        .catch((error) => {
          console.log(error)
        })
    })
}

export const deleteFavorite = async (threadId) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .delete(`http://${backend_url}/api/my-triplist/favorites/${threadId}`, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((response) => {
          return response.data.message
        })
        .catch((error) => {
          console.log(error)
        })
    })
}

export const addThreadIntoTrip = async (triplsitId, threadId) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .put(`http://${backend_url}/api/my-triplist/triplists/${triplsitId}/add/${threadId}`, {}, {
          headers: {
            'Authorization': idToken
          }
        })
        .then((response) => {
          return response.data.message
        })
        .catch((error) => {
          console.log(error)
        })
    })
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

export const createTriplistByThread = async (id, thumbnail, title, desc) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .post(`http://${backend_url}/api/my-triplist/triplists/add/${id}`,
          {
            "title": title,
            "description": desc,
            "thumbnail": thumbnail,
          }, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}
export const createTriplist = async (title, desc) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .post(`http://${backend_url}/api/my-triplist/triplists/add`,
          {
            "title": title,
            "description": desc,
            "thumbnail": 'https://s.isanook.com/tr/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL3RyLzAvdWQvMjc5LzEzOTU2ODEvNV9yZWFzb25hYmxlLmpwZw==.jpg',
          }, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}

export const deleteTriplist = async (id) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .delete(`http://${backend_url}/api/my-triplist/triplists/${id}`, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}

export const deleteThreadInTriplist = async (id, tripId) => {
  const threadId = id
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .delete(`http://${backend_url}/api/my-triplist/triplists/${tripId}/remove/${threadId}`, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}

export const editTriplist = async (id, thumbnail, title, desc) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      return await axios
        .put(`http://${backend_url}/api/my-triplist/triplists/${id}`,
          {
            "title": title,
            "description": desc,
            "thumbnail": thumbnail
          }, {
          headers: {
            'Authorization': idToken
          }
        })
    }).catch(function (error) {
      console.log(error)
    });
}

export const getThreadInTrip = async (id, page) => {
  return await auth.currentUser
    .getIdToken(true)
    .then(async (idToken) => {
      //Get trip list
      return await axios
        .get(`http://${backend_url}/api/my-triplist/triplists/${id}/${page}`, {
          headers: {
            'Authorization': idToken
          }
        }).then((result) => {
          return result.data
        }).catch(function (error) {
          console.log(error)
        });
    }).catch(function (error) {
      console.log(error)
    });
}