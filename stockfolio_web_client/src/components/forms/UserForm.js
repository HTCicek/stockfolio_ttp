import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectName,
  selectEmail,
  selectPass,
  selectPassConf,
  changeName,
  changeEmail,
  changePass,
  changePassConf
} from '../../app/redux/userSlice'

import { logIn } from '../../app/redux/authSlice'

import { useHistory } from 'react-router-dom'

import { Grid, TextField, Button, makeStyles, Typography } from '@material-ui/core'

import { newUser, logIn as newAuth } from '../../app/backendAdapter'

const useStyles = makeStyles( theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const UserForm = (props) => {
  const { registering } = props;
  const history = useHistory()

  const [error, setError] = useState(false)
  const [errorMessages, setMessages] = useState([])

  const name = useSelector(selectName)
  const email = useSelector(selectEmail)
  const password = useSelector(selectPass)
  const password_confirmation = useSelector(selectPassConf)

  const dispatch = useDispatch()
  
  const classes = useStyles()
  const clickHandler = e => {
    e.preventDefault()

    registering ?
    registerEvent() :
    signInEvent()
  }
  const registerEvent = () => {
    const userObj = { name, email, password, password_confirmation }
    newUser(userObj)
      .then( res => res.json())
      .then( data => {
        console.dir(data)
        if (data.errors){
          failedLogin(data)
        } else {
          successfulLogin(data)

        }
      })
      .catch( err => {
        console.error(err)
      })
  }
  
  const signInEvent = () => {
    newAuth(email, password)
      .then( res => res.json())
      .then( data => {
        if (data.errors){
          failedLogin(data)
        } else {
          successfulLogin(data)
        }
      })
      .catch( err => {
        console.error(err)
      })
  }

  const successfulLogin = data => {
    console.dir(data) // data.user.data.attributes, and data.token
    const { token } = data
    const { name } = data.user
    const payload = {name, token}
    dispatch(logIn(payload))
    history.push('/portfolio')
  }

  const failedLogin = data => {
    console.error(data.errors)
    setError(true)
    setMessages(data.errors)
  }

  const errorBox = (messages) => {
    return messages.map( message => <Typography color="error" children={message} />)
  }
  return (
    <Grid container spacing={2}>
      { error ? errorBox(errorMessages) : null}
                  {
        // conditional rendering name and password_confirmationirmation
        registering ? (
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={e => dispatch(changeName(e.target.value))}
              />
            </Grid>
        ) : null
      }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={e => dispatch(changeEmail(e.target.value))}
               />

            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => dispatch(changePass(e.target.value))}
               />

            </Grid>
            {
              registering ? (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password_confirmation"
                label="Confirm Password"
                name="password_confirmation"
                type="password"
                value={password_confirmation}
                onChange={e => dispatch(changePassConf(e.target.value))}
               />
            </Grid>)
              : null
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={clickHandler}
              className={classes.submit}
            >
              Sign In
            </Button>
          </Grid>
  );
};

export default UserForm;
