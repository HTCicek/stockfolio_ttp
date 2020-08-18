import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    loggedIn: localStorage.loggedIn === 'true',
    name: '',
    balance: 0
  },
  reducers: {
    logIn: (state, action) => {
      const { token, name, balance } = action.payload
      localStorage.setItem('token', token)
      localStorage.setItem("loggedIn", true)
      return {...state, token, name, balance, loggedIn: true}
    },
    logOut: state => {
      localStorage.removeItem('token')
      localStorage.removeItem('loggedIn')
      return {...state, token: null, balance: 0, loggedIn: false, name: ''}
    },
    updateBalance: (state, action) => {
      const {balance} = action.payload
      return {...state, balance}
    }
  }
})

export const { logIn, logOut, updateBalance } = authSlice.actions

export const isLoggedIn = state => state.auth.loggedIn

export const selectName = state => state.auth.name

export const selectBalance = state => state.auth.balance

export default authSlice.reducer;