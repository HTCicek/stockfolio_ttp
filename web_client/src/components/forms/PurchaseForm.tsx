import React, {useState, useEffect} from 'react';
import { Autocomplete } from '@material-ui/lab';


import { Grid, makeStyles, TextField, Button, CircularProgress, Typography } from '@material-ui/core'

import {getSymbol} from '../../app/tickerSymbolAdapter'
import {purchaseStock} from '../../app/backendAdapter'

import {useSelector, useDispatch} from 'react-redux'
import {updateBalance} from '../../app/redux/authSlice'
import { changeQuantity, changeSymbol, selectQty, selectSym } from '../../app/redux/purchaseSlice'
import { updatePortfolio } from '../../app/redux/stockSlice'

const useStyles = makeStyles( theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const PurchaseForm = () => {
  const dispatch = useDispatch()
  const quantity = useSelector(selectQty)
  const symbol = useSelector(selectSym)

  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessages, setMessages] = useState([])
  const [options, setOptions] = useState([])
  const loading = open && options.length === 0
  
  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    return (() => {
      active = false
    })
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])
  
  const submissionHandler = e => {
    e.preventDefault()

    console.log({symbol, quantity})

    const payload = {symbol, quantity}
    purchaseStock(payload)
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          setError(true)
          setMessages(data.errors)
        } else {
          console.dir(data)
          const { current_value: currentValue, stocks} = data.portfolio
          const stocksPayload = {currentValue, stocks}
          const balance = parseInt(data.balance, 10)
          dispatch(updateBalance({balance}))
          dispatch(updatePortfolio(stocksPayload))
          
          // temporary fix
          // window.location.reload()

        }
      })
      .catch(console.error)
  }
  
  const quantityHandler = e => {
    setError(false)
    setMessages([])
    const {value} = e.target
    const parsedInt = parseInt(value, 10)
  
    if (Number.isFinite(parsedInt)) dispatch(changeQuantity(parsedInt))
  }

  const symbolHandler = e => {
    setError(false)
    setMessages([])
    const {value} = e.target
    dispatch(changeSymbol(value))
    if (value.length > 0) {
      getSymbol(value)
      .then(res => res.json())
      .then(stocks => {
        setOptions(stocks)
      })
    }
  }

  const autoHandler = (_e, val) => {
    // This handler takes care of the selection of a 
    // ticker symbol
    // because it's a controlled input that we're calling the backend with
    // we need to update the value in the case that the user
    // doesn't type in the full symbol
    dispatch(changeSymbol(val.symbol))
  }
  const errorBox = (messages) => {
    return messages.map( message => <Typography color="error" children={message} />)
  }
  const classes = useStyles()
  return (
    <Grid container spacing={2}>
      { error ? errorBox(errorMessages) : null}
      <Grid item xs={12}>
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          getOptionSelected={(option, value) => option === value}
          getOptionLabel={option => (
            `${option.symbol} -- ${option.name}`
          )}
          options={options}
          loading={loading}
          loadingText="Searching..."
          onChange={autoHandler}
          renderInput={ params => (
            <TextField 
              {...params}
              label="Ticker Symbol"
              variant="outlined"
              value={symbol}
              style={{fontSize: "small"}}
              onChange={symbolHandler}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )

          }
         />
        {/* <TextField 
        variant="outlined"
        required
        fullWidth
        id="symbol"
        label="Ticker Symbol"
        name="symbol"
        value={symbol}
        onChange={symbolHandler}
        options={options}
        /> */}
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
        value={quantity}
        onChange={quantityHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
        type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submissionHandler}
              className={classes.submit}
        >
          Purchase
        </Button>
      </Grid>
    </Grid>
  );
}

export default PurchaseForm;
