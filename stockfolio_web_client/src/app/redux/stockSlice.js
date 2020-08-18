import { createSlice } from '@reduxjs/toolkit'

export const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    stocks: [],
    value: 0,
  },
  reducers: {
    updatePortfolio: (state, action) => {
      // this will update with portfolio amount
      const { stocks, currentValue } = action.payload
      return {...state, stocks: stocks, value: currentValue }
    },
    logOutPortfolio: state => {
      return {...state, value: 0, stocks: []}
    }
  }
})

export const { updatePortfolio, logOutPortfolio } = stockSlice.actions

export const selectStocks = state => state.stock.stocks

export const selectPortValue = state => state.stock.value

export default stockSlice.reducer
