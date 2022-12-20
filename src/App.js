import React, { } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header';
import SignUp from './Pages/SignUp';

const App = () => {
  return (
    <div>
      <Header />
      <Route path='/signup'><SignUp /></Route>
    </div>
  );
}

export default App;