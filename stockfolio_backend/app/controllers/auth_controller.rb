class AuthController < ApplicationController
  def create
    user = User.find_by(email: params[:email])

    if user
      token = encode_token(user.id)
      user_json = UserSerializer.new(user).serializable_hash
      render json: {
        token: token,
        user: user_json
      }
    else
      verification_error
    end

  end

  def verify
    user = session_user

    if user
      user_json = UserSerializer.new(user).serializable_hash
      render json: {
        user: user_json
      }

    else
      verification_error
    end
  end
end
