/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // function that takes in an array of tweet objects and uses the returned jquery object to append each tweet to the section where the tweets are.
  const renderTweets = function(tweets) {
    // loops through tweets
    $('#tweets-posted').empty()
    for (let obj in tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweets[obj])
      // takes return value and appends it to the tweets container
      $("#tweets-posted").prepend($tweet)
    }
  }
  
  // Takes in a tweet object and returns an html article that contains the html structure of the tweet.
  const createTweetElement = function(obj) {
    // function that re-encodes text so that undafe characters are converted into a safe "encoded" representation.
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //Creates the structure of the tweet to be included in the html
    const tweet = 
    `<article class="tweet">
    <header>
    <div class="name">
    <img src="${escape(obj.user.avatars)}" width=40px height=40px>
    <span>${escape(obj.user.name)}</span>
    </div>
    <div class="handle">
    <span>${escape(obj.user.handle)}</span>
    </div>
    </header>
    <p>${escape(obj.content.text)}</p>
    <footer>
    <div class="date">
    ${timeago.format(obj.created_at)}
    </div>
    <div class="info">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `; 
    // return the structure to be appended to the html article
    return tweet;
  };
  
  const data = [];
  renderTweets(data)

  // Functionality for the submit button
  document.getElementById("button").addEventListener('click', function(e) {
    
    e.preventDefault();

    // The following conditionals are for the submit button rules: doesn't work if the textbox is empty or if there are more than 140 characters. In these cases, an error message appears
    if ($('textarea').val() === null || $('textarea').val() === "" ) {
      $(".validate").slideDown();
      $("#error").text('! Cannot post empty tweet !')
    } else if ($('textarea').val().length > 140) {
      $(".validate").slideDown();
      $("#error").text('! Tweet must be 140 characters or less !')
      // If there are no errors, the tweets are posted and the character counter returns to 140.
    } else {
      $(".validate").slideUp();
      const form = $('form').serialize();
      
      $.ajax( {
        type: 'POST',
        data: form,
        url: '/tweets/'
      })
      .then(function() {
        $('#tweet-text').val("");
        $('.counter').val(140)
        loadTweets();
        
      })
    }
    
  })

  // function that loads tweets from the database to show them on the screen. This function calls the renderTweets function.
  const loadTweets = function() {
    
    $.ajax("/tweets/")
    .then(function(data) {
      renderTweets(data)
    });
  }
  loadTweets()

//When the button is clicked, the cursor moves to the textarea. If the text area is not in view when the button is clicked, the window scrolls to put it in view.
  $("#composeTweet").click(function() {
    $("textarea").focus();
  });

});

