import React from 'react';
import {Helmet} from 'react-helmet'
import { Container, Typography, makeStyles, Link, Grid } from '@material-ui/core'
import UserForm from '../forms/UserForm'

import {NavLink} from 'react-router-dom'

const useStyles = makeStyles( theme => ({
  form: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formPaper: {
    marginTop: theme.spacing(3)
  }
}))

const Register = () => {
  const classes = useStyles()
  return (
    <Grid item>
      <Helmet>
        <title>
          Registration
        </title>
      </Helmet>
      <Container component="main" maxWidth="xs" className={classes.form}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.formPaper}>
          <UserForm registering={true} />
        </form>
        <NavLink to="/sign-in" component={Link}>
          Already have an account? Sign in
        </NavLink>
      </Container>
    </Grid>
  );
}

export default Register;
