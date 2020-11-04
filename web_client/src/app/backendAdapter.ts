// const API = 'https://stockfolio-backend-api.herokuapp.com'
const API = 'http://localhost:4000'

const logIn = (email, password) => {
  return fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
}

const getCurrentUser = () => {
  return fetch(`${API}/login`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    }
  })
}

const newUser = user => {
  // user must be an object containing
  // name, email, password, password_confirmation
  return fetch(`${API}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  })
}

const getUserStocks = () => {
  return fetch(`${API}/portfolio`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    }
  })
}

const purchaseStock = ({symbol, quantity}) => {
  return fetch(`${API}/stocks`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify({ symbol, quantity })
  })
}

export { logIn, getCurrentUser, newUser, getUserStocks, purchaseStock };