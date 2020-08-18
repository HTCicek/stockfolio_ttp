import React, { useState } from 'react';
// import { AutoComplete } from '@material-ui/lab';
import { Grid, makeStyles, TextField, Button } from '@material-ui/core'

// import getSymbol from '../../app/tickerSymbolAdapter'

const useStyles = makeStyles( theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const PurchaseForm = () => {
  const [purchaseQuantity, setQuantity] = useState(0)
  const clickHandler = e => {
    e.preventDefault()
  }
  
  const quantityHandler = e => {
    const {value} = e.target
    const parsedInt = parseInt(value, 10)
  
    if (Number.isFinite(parsedInt)) setQuantity(parsedInt)
  
    return null;
  }
  const classes = useStyles()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField 
        variant="outlined"
        required
        fullWidth
        id="symbol"
        label="Ticker Symbol"
        name="symbol"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
        variant="outlined"
        required
        fullWidth
        id="quantity"
        label="Quantity"
        name="quantity"
        type="number"
        inputProps={{min: 0, step: 1}}
        value={purchaseQuantity}
        onChange={quantityHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
        type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={clickHandler}
              className={classes.submit}
        >
          Purchase
        </Button>
      </Grid>
    </Grid>
  );
}

export default PurchaseForm;
