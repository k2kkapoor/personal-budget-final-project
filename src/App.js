import React, { useState, useEffect } from "react";
import "./components/login/login.css";
import axios from "axios";
import fire from "./fire";
import Login from "./components/login/Login";
import HomePage from "./components/homepage/HomePage";

const App = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();

    //Authentication using firebase with username and password
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // window.location = <HomePage />;
      })

      .catch((err) => {
        // eslint-disable-next-line default-case
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    localStorage.clear();
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        axios({
          method: "post",
          headers: { Pragma: "no-cache" },
          url: "http://localhost:3050/addUser",
          data: {
            name: name,
            username: email,
          },
        });
      })
      .catch((err) => {
        // eslint-disable-next-line default-case
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    setUser("");
    localStorage.clear();
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        localStorage.setItem("isUser", setIsLoggedIn(true));
      } else {
        setUser("");
        localStorage.clear();
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const loggedInCheck = localStorage.getItem("isUser");
  if (loggedInCheck) {
    return <HomePage handleLogout={handleLogout} />;
  } else {
    return (
      <div className="App">
        {user ? (
          <HomePage handleLogout={handleLogout} />
        ) : (
          <Login
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}
      </div>
    );
  }
};

export default App;
