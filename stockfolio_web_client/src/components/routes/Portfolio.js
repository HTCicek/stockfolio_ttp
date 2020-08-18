import React from 'react';

import {Helmet} from 'react-helmet'

import { Grid, Divider, makeStyles } from '@material-ui/core'

import PurchaseForm from '../forms/PurchaseForm'
import PortfolioTable from '../table/PortfolioTable';

const useStyles = makeStyles( theme => ({
  table: {
    marginTop: theme.spacing(10),
  }
}))

const Portfolio = () => {
  const classes = useStyles()
  return (
    <Grid container item direction="row" alignItems="center" justify="space-around" className={classes.table}>
      <Helmet>
        <title>
          Portfolio
        </title>
      </Helmet>
      <Grid item xs={8} >
        <PortfolioTable />
      </Grid>
      <Divider orientation="vertical" flexItem xs={1} />
      <Grid item xs={3}>
        <PurchaseForm />
      </Grid>
    </Grid>
  );
}

export default Portfolio;
