import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Layout/Header';
import AuthContext from './firebase/auth-context';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ResetPassword from './Pages/ResetPassword';
import SignUp from './Pages/SignUp';

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/login' />
        </Route>
        {authCtx.isLoggedIn && <Route path='/home'><Home /></Route>}
        {authCtx.isLoggedIn && <Route path='/profile'><Profile /></Route>}
        {!authCtx.isLoggedIn && <Route path='/login'><Login /></Route>}
        {!authCtx.isLoggedIn && <Route path='/signup'><SignUp /></Route>}
        {!authCtx.isLoggedIn && <Route path='/resetpassword'><ResetPassword /></Route>}
        <Route path='*'><Redirect to='/login' /></Route>
      </Switch>
    </div>
  );
}

export default App;