import React from 'react';

import {useSelector} from 'react-redux'

import { selectStocks, selectPortValue } from '../../app/redux/stockSlice'

import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer, Paper, makeStyles, Typography} from '@material-ui/core'
import { selectBalance } from '../../app/redux/authSlice';

const useStyles = makeStyles( theme => ({
  table: {
    height: theme.spacing(50)
  },
  low: {
    color: "red"
  },
  same: {
    color: "grey"
  },
  high: {
    color: 'green'
  }
}))

// Portfolio Table needs the following columns
// Stock Symbol
// Quantity
// Current Price
// Most Recent price (open or last night)
// cells for balance and portfolio value

/** each data member should look like
 * {
 *  id: 1,
 *  symbol: "MSFT",
 *  companyName: "Microsoft Inc.",
 *  quantity: "3",
 *  currentPrice: "113.57",
 *  comparePrice: "110.23"
 * }
 * 
 */

 const groupBy = (arr, prop) => {
    const map = new Map(Array.from(arr, obj => [obj[prop], []]))
    arr.forEach(obj => map.get(obj[prop]).push(obj))
    return Array.from(map.values())
 }

const transformData = array => {

  const groupedArr = groupBy(array, "symbol")

  return groupedArr.map( stockSymbol => {
    return {
      id: stockSymbol[0]["id"],
      symbol: stockSymbol[0]["symbol"],
      companyName: stockSymbol[0]["company_name"],
      quantity: stockSymbol.length,
      currentPrice: stockSymbol[0]["latest_price"],
      comparePrice: stockSymbol[0]["compare_price"]
    }
  })
  // array.map( stock => {
  //   return {
  //     id: stock.id,
  //     symbol: stock.symbol,
  //     companyName: stock.company_name,
  //     quantity: stock.length
  //   }
  // })
}



const PortfolioTable = () => {
  const stocks = useSelector(selectStocks)

  const mappingStocks = transformData(stocks)

  const tableRowMapping = stockArr => {

    const colorHandler = (curr, past) => {
      if (curr > past) return classes.high
      if (curr < past) return classes.low
      return classes.same
    }
    
    return stockArr.map( stockObj => {
  
      const {companyName, symbol, quantity, comparePrice, currentPrice} = stockObj
      
        return (
          <TableRow key={stockObj.id}>
            <TableCell >{companyName}</TableCell>
            <TableCell align="right">{symbol}</TableCell>
            <TableCell align="right">{quantity}</TableCell>
            <TableCell align="right">{(comparePrice / 10).toFixed(2)}</TableCell>
            <TableCell align="right" >
              <Typography className={colorHandler(currentPrice, comparePrice)} >
              {(currentPrice / 10).toFixed(2)}
              </Typography>
              </TableCell>
          </TableRow>
        )
  
    })
  }

  const portfolioVal = useSelector(selectPortValue)
  const balance = useSelector(selectBalance)
  
  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Balance:</TableCell>
            <TableCell>{(balance / 100).toFixed(2)}</TableCell>
            <TableCell align="left">Current Portfolio Value:</TableCell>
            <TableCell>{(portfolioVal / 100).toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell align="right">Ticker Symbol</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Opening Price* ($)</TableCell>
            <TableCell align="right">Current Price ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowMapping(mappingStocks)}
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}

export default PortfolioTable;
