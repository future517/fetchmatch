import React, { useState } from 'react';
import Login from './components/Login';
import Search from './components/Search';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <Search />}
    </div>
  );
}

export default App;