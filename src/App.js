import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthContext from './firebase/auth-context';

const Header = React.lazy(() => import('./Components/Layout/Header'));
const Home = React.lazy(() => import('./Pages/Home'));
const Login = React.lazy(() => import('./Pages/Login'));
const Profile = React.lazy(() => import('./Pages/Profile'));
const ResetPassword = React.lazy(() => import('./Pages/ResetPassword'));
const SignUp = React.lazy(() => import('./Pages/SignUp'));

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className='bg-light'>
      <Suspense fallback={<h1 className='text-center'>LOADING.....</h1>}>
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
      </Suspense>
    </div>
  );
}

export default App;