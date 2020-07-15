import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { Route, Redirect } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
// Custom Auth Hook for Authentication
const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

const getUser = (user) => {
  const { displayName, email, photoURL } = user;
  return { name: displayName, email, photo: photoURL }
}
const Auth = () => {
  const [user, setUser] = useState(null);
  
  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const newUser = getUser(res.user);
        setUser(newUser);
        window.history.back();
      })
      .catch((err) => {
        setUser(null);
        return err.message;
      });
  }

  // Sign in with Email and Password
  const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUser = getUser(res.user);
        setUser(newUser);
        window.history.back(); 
      })
      .catch(err => setUser({ error: err.message }))
  }

  // Sign Up with Email Password
  const signUp = (email, password, name) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      
      .then(res => {
        firebase.auth().currentUser.updateProfile({
          displayName: name
        }).then(() => {
          setUser(res.user);
          window.history.back();
        });
      })
      .catch(err => setUser({ error: err.message }))

  }

  // For Sign Out Feature
  const signOut = () => {
    return firebase.auth().signOut()
      .then(() => {
        setUser(null)
      }).catch((err) => {
        setUser(null)
        return err.message;
      });
  }

  // For State Observation
  useEffect(() => {
    firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        const currentUser = getUser(usr);
        setUser(currentUser)
      } else {
        setUser(null);
      }
    });
  }, [])

  return {
    user,
    signInWithGoogle,
    signOut,
    signIn,
    signUp
  }
}
export default Auth;