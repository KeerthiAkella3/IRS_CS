import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import OrgLogin from "./Components/OrgLogin";
import CasePage from "./Components/CasePage";
//import Case from "./Components/Case";
import CaseRetrieve from "./Components/CaseRetrieve";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrgLogin}></Route>
        <Route exact path="/login" render={() => <OrgLogin />}></Route>
        <Route exact path="/home" render={() => <Home />}></Route>
        <Route exact path="/cases" component={CasePage}></Route>
  //      <Route exact path="/createCase" component={Case}></Route>
        <Route exact path="/retrieveCase" component={CaseRetrieve}></Route>
      </Switch>
    </Router>
  );
}

export default App;