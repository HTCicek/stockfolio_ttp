import React from 'react';

import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer, Paper, makeStyles} from '@material-ui/core'

const useStyles = makeStyles( theme => ({
  table: {
    height: theme.spacing(50)
  }
}))

const PortfolioTable = () => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map over data here */}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
    </TableContainer>
  );
}

export default PortfolioTable;
