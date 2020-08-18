class UsersController < ApplicationController
  def create
    user = User.new(**user_create_params)

    if user.save
      token = encode_token(user.id)
      user_json = UserSerializer.new(user).serializable_hash
      render json: {
        token: token,
        user: user_json
      }
    else
      error_json(user)
    end
  end

  def show
    user = session_user

    if user
      render json: {
        user: UserSerializer.new(user).serializable_hash
      }
    else
      verification_error
    end
  end

  private

  def user_create_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def error_json(user)
    render json: {
      errors: user.errors.full_messages
    }
  end
end
