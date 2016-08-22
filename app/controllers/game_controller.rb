class GameController < ActionController::Base

  def try

    if params[:guess].nil?
      @message = "Please enter a number from 0 to 100"
      render 'reset.html.erb'
    else
      #if there is no cookie for counter, set the cookie to 0.
      if cookies[:counter].nil?
        cookies[:counter] = 1
      end
      #instance variable stores the value that is in the cookie
      @counter = cookies[:counter].to_i

      if cookies[:secret].nil?

        #how to create a random number
        prng = Random.new
        # storing secret number in a cookie
        cookies[:secret] = prng.rand(101).to_i
      end
      #setting the instance variable @random to equal the secret number stored in the cookies
      @random = cookies[:secret].to_i
      #if the user guess is less than the secret number then the result is stored
      if cookies[:winner] == "winner"
        render "winner.html.erb"
      else
        if params[:guess].to_i < @random
          @result = "Your guess of " + params[:guess].to_s + " is too low."
          #after each guess the cookie stores the value of counter + 1
          cookies[:counter] = @counter + 1
          if cookies[:counter] >= 6
            render "loser.html.erb"
          end
        elsif params[:guess].to_i > @random
          @result = "Your guess of " + params[:guess].to_s + " is too high."
          cookies[:counter] = @counter + 1
          if cookies[:counter] >= 6
            render "loser.html.erb"
          end
        else
          #if the guess is right, then the result is stored and a new random number is stored in the cookie
          cookies[:counter] = @counter + 1
          #renders the view
          cookies[:winner] = "winner"
          render "winner.html.erb"
        end
      end
    end
  end

  def reset
    prng = Random.new
    @message = "You're all set! Start guessing NOW! :-D"
    @random = prng.rand(101)
    cookies[:secret] = @random
    #reset counter to 1 after winning
    #setting to one because 1st guess is 1
    cookies[:counter] = 1
    render "new_game.html.erb"
    cookies[:winner] = "nothing"
  end

end #end of class GameController
