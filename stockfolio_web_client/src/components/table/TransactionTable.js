import React from 'react';

import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer, Paper, makeStyles} from '@material-ui/core'
import { useSelector } from 'react-redux';
import { selectStocks } from '../../app/redux/stockSlice';

const useStyles = makeStyles( theme => ({
  table: {
    height: theme.spacing(50)
  }
}))

// Transaction Table Needs the following columns:
// Date
// Stock Symbol
// Company Name
// Purchased ($)

/** Each data member should look like:
 * {
 *  id: 1,
 *  symbol: "MSFT",
 *  companyName: "Microsoft Inc.",
 *  purchasePrice: "125.00",
 *  datePurchased: "March 27th, 2018 1000" or something
 * }
 */
const transformData = array => {

  return array.map( stock => {
    return {
      id: stock.id,
      symbol: stock.symbol,
      companyName: stock.company_name,
      purchasePrice: stock.purchased_price,
      datePurchased: stock.created_at
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

const TransactionTable = () => {
  const classes = useStyles()

  const stocks = useSelector(selectStocks)

  const mappingStocks = transformData(stocks)

  const tableRowMapping = stockArr => {
    return stockArr.reverse().map( stockObj => {
      const {id, symbol, companyName, purchasePrice, datePurchased} = stockObj

      const readableTime = (new Date(datePurchased)).toTimeString()
      return (
        <TableRow key={id}>
          <TableCell>{companyName}</TableCell>
          <TableCell align="right">{symbol}</TableCell>
          <TableCell align="right">{(purchasePrice/100).toFixed(2)}</TableCell>
          <TableCell align="right">{readableTime}</TableCell>
        </TableRow>
      )
    })
  }

  return (
   <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell align="right">Ticker Symbol</TableCell>
            <TableCell align="right">Purchase Price ($)</TableCell>
            <TableCell align="right">Purchase Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowMapping(mappingStocks)}
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}

export default TransactionTable;
