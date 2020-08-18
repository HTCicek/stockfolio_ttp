import { createSlice } from '@reduxjs/toolkit'

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    symbol: '',
    quantity: 0,
  },
  reducers: {
    changeQuantity: (state, action) => {
      const {quantity} = action.payload
      return {...state, quantity }
    },
    changeSymbol: (state, action) => {
      const {symbol} = action.payload
      return {...state, symbol}
    }
  }
})

export const { changeQuantity, changeSymbol } = purchaseSlice.actions

export const selectQty = state => state.purchase.quantity
export const selectSym = state => state.purchase.symbol

export default purchaseSlice.reducer;