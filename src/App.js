import logo from './logo.svg';
import React from 'react';
import './App.css';
import DnsInventory from './components/DnsInventory';
import MaliciousUrlChecker from './components/MaliciousUrlChecker';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
function App() {
  return (
    <div className="App">
      <DnsInventory />
      <MaliciousUrlChecker />
    </div>
  );
}

export default App;
