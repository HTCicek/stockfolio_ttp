import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    password: '',
    password_conf: '',
  },
  reducers: {
    changeName: (state, action) => {
      const name = action.payload
      return {...state, name}
    },
    changeEmail: (state, action) => {
      const email = action.payload
      return {...state, email}
    },
    changePass: (state, action) => {
      const password = action.payload
      return {...state, password}
    },
    changePassConf: (state, action) => {
      const password_conf = action.payload
      return {...state, password_conf}
    }
  }
})

export const { changeName, changeEmail, changePass, changePassConf
 } = userSlice.actions

 export const selectName = state => state.user.name
 export const selectEmail = state => state.user.email
 export const selectPass = state => state.user.password
 export const selectPassConf = state => state.user.password_conf

export default userSlice.reducer;