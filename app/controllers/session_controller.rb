class SessionController < ApplicationController
  def new
  end

  def create
    user = User.where( :email => params[:email] ).first
    if user.present? && user.authenticate( params[:password] )
      session[:user_id] = user.id
      flash[:notice] = nil
      redirect_to(root_path)
    else
      flash[:notice] = "Looks like something went wrong with your login. Please try again!"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to(root_path)
  end
end