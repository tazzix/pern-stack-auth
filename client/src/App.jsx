import React, { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { toast } from 'react-toastify';

// components

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/Landing';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch('http://localhost:5000/authentication/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      // parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setIsAuthenticated(parseRes === true);
    } catch (err) {
      console.error('checkAuthenticated error: ', err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (!isAuthenticated ? (
                <Landing {...props} />
              ) : (
                <Redirect to="/dashboard" />
              ))}
            />
            <Route
              exact
              path="/login"
              render={(props) => (!isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              ))}
            />
            <Route
              exact
              path="/register"
              render={(props) => (!isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              ))}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) => (isAuthenticated ? (
                <Dashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              ))}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
