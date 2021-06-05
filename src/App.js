import React, { useState } from 'react';

import Routes from './routes';

import TokenContext from './contexts/token';

import './App.css';
import LoadingContext from './contexts/loading';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('TOKEN_USER'));
  const [showLoading, setShowLoading] = useState(false);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <LoadingContext.Provider value={{ showLoading, setShowLoading }}>
        <Routes />
      </LoadingContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
