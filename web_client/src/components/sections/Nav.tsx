import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {selectName, isLoggedIn, logOut} from '../../app/redux/authSlice'
import {logOutPortfolio} from '../../app/redux/stockSlice'

import { AppBar, Toolbar, Tabs, Typography, IconButton, Grid } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import LinkTab from '../routes/LinkTab'

const Nav = () => {
  const [value, setValue] = useState(0)
  
  const dispatch = useDispatch()
  const history = useHistory()
  const name = useSelector(selectName)
  const loggedIn = useSelector(isLoggedIn)
  
  const logOutHandler = e => {
    e.preventDefault()
    dispatch(logOut())
    dispatch(logOutPortfolio())
    history.push("/")
  }
  
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
        <Toolbar>
          <Grid container direction="row"
                justify="center"
                alignItems="center" 
                wrap="nowrap"
          >
            {
            loggedIn ?
            <Grid container item alignItems="center" justify="flex-start" wrap="nowrap" xs={3}>
              <Grid item>
                <IconButton  onClick={logOutHandler} >
                  <ExitToAppIcon />
                </IconButton>
              </Grid> 
              <Grid item>
                <Typography noWrap>
                  {`Logged in as ${name}`}
                </Typography>
              </Grid>
            </Grid> : null
            }
              <Grid item xs={6} alignItems="center">
                <Typography align="center">
                    Stockfolio
                </Typography>
              </Grid>
            {
            loggedIn ?
            <Grid item xs={3}>
              <Tabs value={value} onChange={handleChange}>
                <LinkTab to="/portfolio" label="Portfolio" value={0} />
                <LinkTab to="/transactions" label="Transactions" value={1} />
              </Tabs> 
            </Grid> : null
            }
          </Grid>
        </Toolbar>
      </AppBar>
  );
}

export default Nav;
