import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    loggedIn: localStorage.loggedIn === 'true',
    name: ''
  },
  reducers: {
    logIn: (state, action) => {
      const { token, name } = action.payload
      localStorage.setItem('token', token)
      localStorage.setItem("loggedIn", true)
      return {...state, token, name, loggedIn: true}
    },
    logOut: state => {
      localStorage.removeItem('token')
      localStorage.removeItem('loggedIn')
      return {...state, token: null, loggedIn: false, name: ''}
    }
  }
})

export const { logIn, logOut } = authSlice.actions

export const isLoggedIn = state => state.auth.loggedIn

export const selectName = state => state.auth.name

export default authSlice.reducer;