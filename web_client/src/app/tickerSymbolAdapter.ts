// const API = "https://stockfolio-symbol-service.herokuapp.com"
const API = "http://localhost:4567"

const getSymbol = partial => {
  return fetch(`${API}/tickers/${partial}`)
}

export { getSymbol }