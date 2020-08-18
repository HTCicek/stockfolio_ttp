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
      Authorization: localStorage.token,
    }
  })
}

const newUser = user => {
  // user must be an object containing
  // name, email, password, password_conf
  return fetch(`${API}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user })
  })
}

export { logIn, getCurrentUser, newUser };