import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';
// import reportWebVitals from './reportWebVitals';
// import "assets/scss/material-kit-react.scss?v=1.9.0";
import evef from "views/Signin/evef";
import LoginPage from "views/Signin/login.js";
import signinPage from "views/Signin/signup.js"
import forgotpass from "views/Signin/forgotpass.js"
import resetpass from "views/Signin/resetpassword.js"
import home from "views/HomePage/home.js"




ReactDOM.render(
<Router>
    <Switch>
    <Route path="/evef/:token" component={evef} />
    <Route path="/login-page" component={LoginPage} />
    <Route path="/sign-up" component={signinPage} />
    <Route path="/fpass-page" component={forgotpass} />
    <Route path="/resetpass/:token" component={resetpass} />
    <Route path="/" component={home} />
    </Switch>
</Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
