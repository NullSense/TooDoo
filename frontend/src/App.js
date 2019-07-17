import React from 'react';
import TODOList from './TODOList.js';
import './App.css';

/**
 * return and export this app
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TODOList />
      </header>
    </div>
  );
}

export default App;
