class IexWrapper
  API_ENDPOINT = "https://cloud.iexapis.com/stable"
  TEST_API_ENDPOINT = "https://sandbox.iexapis.com/stable"
  PUBLISHABLE_TOKEN = "pk_d9e265ae82af4471b9c814498d8c0999"
  PUBLISHABLE_TEST_TOKEN = "Tsk_a2760f4d76294bfda6cbd90c74ca4909"

  attr_reader :api
  
  def initialize(test: false)
    endpoint = test ? TEST_API_ENDPOINT : API_ENDPOINT
    token = test ? PUBLISHABLE_TEST_TOKEN : PUBLISHABLE_TOKEN
    @api = Faraday.new(
      url: endpoint,
      params: {
        token: token
      }
    )
  end

  def quote(symbol)
    api.get("stock/#{symbol}/quote")
  end

  def batch_quote(symbols)
    api.get('stock/market/batch') do |req|
      req.params['symbols'] = symbols.join(',')
      req.params['types'] = 'quote'
    end
  end

end