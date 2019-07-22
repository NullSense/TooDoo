import React from 'react';
// import TODOList from './TODOList.js';
import TodoList from './TodoList.js';
// import './App.css';
import './App.css';

/**
 * return and export this app
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList />
      </header>
    </div>
  );
}

export default App;
