import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

const Header = React.lazy(() => import('./Components/Layout/Header'));
const Home = React.lazy(() => import('./Pages/Home'));
const Login = React.lazy(() => import('./Pages/Login'));
const Profile = React.lazy(() => import('./Pages/Profile'));
const ResetPassword = React.lazy(() => import('./Pages/ResetPassword'));
const SignUp = React.lazy(() => import('./Pages/SignUp'));

const App = () => {
  const loginStatus = useSelector((state) => (state.auth.isLoggedIn));
  const darkTheme = useSelector((state) => (state.dark.isDark));

  return (
    <div className={darkTheme ? 'bg-secondary' : 'bg-light'}>
      <Suspense fallback={<h1 className='text-center'>LOADING.....</h1>}>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          {loginStatus && <Route path='/home'><Home /></Route>}
          {loginStatus && <Route path='/profile'><Profile /></Route>}
          {!loginStatus && <Route path='/login'><Login /></Route>}
          {!loginStatus && <Route path='/signup'><SignUp /></Route>}
          {!loginStatus && <Route path='/resetpassword'><ResetPassword /></Route>}
          <Route path='*'><Redirect to='/login' /></Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;