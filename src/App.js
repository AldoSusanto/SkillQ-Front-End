import React from 'react';
import './App.css';
import HomePage from './HomePage/HomePage';
import Study from './StudyPage/Study';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact={true} component={HomePage}/>
          <Route path="/Study/:id" exact={true} component={Study} />
      </Switch>
    </Router>
  );
}

export default App;
