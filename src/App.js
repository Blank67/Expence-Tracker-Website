import React, { } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

const App = () => {
  return (
    <div>
      <Header />
      <Route path='/home'><Home /></Route>
      <Route path='/login'><Login /></Route>
      <Route path='/signup'><SignUp /></Route>
    </div>
  );
}

export default App;