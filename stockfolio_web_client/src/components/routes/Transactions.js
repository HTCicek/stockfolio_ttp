import React from 'react';
import { Helmet } from 'react-helmet';

import { Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme => ({
  table: {
    marginTop: theme.spacing(10),
  }
}))

const Transactions = () => {
  const classes = useStyles()
  return (
    <>
      <Helmet>
        <title>
          View Transactions
        </title>
      </Helmet>
      <Grid container item direction="row" alignItems="center" justify="space-around" className={classes.table}>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    </>
  );
}

export default Transactions;
