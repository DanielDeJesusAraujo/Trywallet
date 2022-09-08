import React from 'react';
import { Route } from 'react-router-dom';
import Loging from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Route
        exact
        path="/"
        render={ (props) => <Loging props={ { ...props } } /> }
      />

      <Route
        exact
        path="/carteira"
        render={ (props) => <Wallet props={ { ...props } } /> }
      />

    </div>
  );
}

export default App;
