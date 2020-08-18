import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Register from './components/routes/Register'
import Transactions from './components/routes/Transactions'
import Portfolio from './components/routes/Portfolio'
import Welcome from './components/routes/Welcome'
import SignIn from './components/routes/SignIn'
import { Grid, AppBar, Toolbar } from '@material-ui/core';

import { useSelector } from 'react-redux'
import { isLoggedIn } from './app/redux/authSlice'
// import {getCurrentUser} from './app/backendAdapter'
import PrivateRoute from './components/routes/PrivateRoute';

function App() {

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     getCurrentUser()
  //     .then(res => res.json())
  //     .then( data => {
  //       if (data.errors){
  //         console.error(data.errors)
  //       } else {
  //         const { token } = localStorage.getItem('token')
  //         const { name } = data.user.data.attributes
  //         const payload = {token, name}
  //         dispatch(logIn(payload))
  //       }
  //     })
  //   }
  //   return (() => dispatch(logOut))}, [])

  const loggedIn = useSelector(isLoggedIn)
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>

        </Toolbar>
      </AppBar>
      <Grid container direction="row" alignItems="center" justify="center">
        <Switch>

          <PrivateRoute path="/transactions" component={Transactions}/>
          <PrivateRoute path="/portfolio" component={Portfolio} />

          <Route path="/register">
            {loggedIn ? <Redirect to="/portfolio" /> : <Register />}
          </Route>
          
          <Route path="/sign-in">
            {loggedIn ? <Redirect to="/portfolio" /> : <SignIn />}
          </Route>

          <Route path="/welcome">
            {loggedIn ? <Redirect to="/portfolio" /> : <Welcome />}
          </Route>

          <Route path="/">
            <Redirect to="/welcome" />
          </Route>

        </Switch>
      </Grid>
    </>
  );
}

export default App;
