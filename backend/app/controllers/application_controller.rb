class ApplicationController < ActionController::API

  # For the purpose of not needing to deliver an environment file or requiring dotenv, setting JWT secret key to nothing
  
  def encode_token(id)
    JWT.encode({user_id: id}, nil, 'none')
  end

  def auth_header
    request.headers["Authorization"]
  end
  
  def decoded_token
    begin
      JWT.decode(auth_header, nil, false)[0]["user_id"]
    rescue
      nil
    end
  end

  def session_user
    User.find(decoded_token)
  end

  def logged_in?
    !!session_user
  end

  # lifted up verification error
  def verification_error
    render json: {
      errors: ["Incorrect credentials"]
    }
  end
end
