class UsersController < ApplicationController
  def create
    user = User.new(**user_create_params)
    
    user.portfolio = Portfolio.create

    if user.save
      token = encode_token(user.id)

      render json: {
        token: token,
        user: user_json(user: user),
      }

      error_json(user)
    end
  end

  def show
    # portfolio and transactions path
    token = encode_token(user.id)
    if user
      render json: {
        token: token,
        user: user_json,
      }
    else
      verification_error
    end
  end

  private

  def user_json(user: session_user)
    UserBlueprint.render_as_hash(user)
  end

  def user_create_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def error_json(user)
    render json: {
      errors: user.errors.full_messages
    }
  end
end
