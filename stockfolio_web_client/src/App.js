import React, { useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Register from './components/routes/Register'
import Transactions from './components/routes/Transactions'
import Portfolio from './components/routes/Portfolio'
import Welcome from './components/routes/Welcome'
import SignIn from './components/routes/SignIn'
import { Grid } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux'
import { updatePortfolio, logOutPortfolio } from './app/redux/stockSlice'
import { isLoggedIn, logOut, logIn } from './app/redux/authSlice'
import {getCurrentUser} from './app/backendAdapter'

import PrivateRoute from './components/routes/PrivateRoute';
import Nav from './components/sections/Nav';

function App() {

  const dispatch = useDispatch()

  // log in if there's an existing token
  useEffect(() => {
    const existingToken = localStorage.getItem('token')
    
    if (existingToken) {
      getCurrentUser()
      .then(res => res.json())
      .then( data => {
        if (data.errors){
          console.error(data.errors)
          dispatch(logOut())
          dispatch(logOutPortfolio())
        } else {
          const { token } = data
          const { name } = data.user
          const balance = parseInt(data.user.balance, 10)
          const { current_value: currentValue, stocks} = data.user.portfolio
          const authPayload = {token, name, balance}
          const stocksPayload = {currentValue, stocks}
          dispatch(logIn(authPayload))
          dispatch(updatePortfolio(stocksPayload))
        }
      })
    }
    return (() => {
      dispatch(logOutPortfolio())
      dispatch(logOut())
    })}, [])

  const loggedIn = useSelector(isLoggedIn)


  return (
    <>
      <Nav />
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
