import React from 'react';
import { Helmet } from 'react-helmet';

import { Link, Container, makeStyles, Grid, Typography } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles( theme => ({
  welcome: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyText: {
    marginTop: theme.spacing(3)
  }
}))

const Welcome = () => {
  const classes = useStyles()
  return (
    <Grid item>
      <Helmet>
        <title>
          Welcome to Stockfolio!
        </title>
      </Helmet>
      <Container component="main" className={classes.welcome} maxWidth="md">
        <Typography component="h1" variant="h6">
          Welcome to Stockfolio!
        </Typography>
        <Typography component="p" className={classes.bodyText}>
          To get started on investing in stocks{" "}
          <NavLink component={Link} to="sign-in">sign in</NavLink>, or{" "}
          <NavLink component={Link} to="/register">register here</NavLink> to receive $5,000 towards investing!
          </Typography>
      </Container>
    </Grid>
  );
}

export default Welcome;
