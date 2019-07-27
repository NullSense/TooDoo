import React from 'react';
import TodoList from './TodoList.js';
import LoginPage from './LoginPage.js';
import Registration from './Registration.js';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

/**
 * return and export this app
 */
function App() {
  return (
    <Router>
      <header className="App-header"></header>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={Registration} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
