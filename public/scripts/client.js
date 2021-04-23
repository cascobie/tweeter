/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

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
  
  
  const createTweetElement = function(obj) {
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

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
    return tweet;
  };
  
  const data = [];
  renderTweets(data)


  document.getElementById("button").addEventListener('click', function(e) {
    
    e.preventDefault();


    if ($('textarea').val() === null || $('textarea').val() === "" ) {
      $(".validate").slideDown();
      $("#error").text('! Cannot post empty tweet !')
    } else if ($('textarea').val().length > 140) {
      $(".validate").slideDown();
      $("#error").text('! Tweet must be 140 characters or less !')
    } else {
      $(".validate").slideUp();
      const form = $('form').serialize();
      // console.log(form);
      $.ajax( {
        type: 'POST',
        data: form,
        url: '/tweets/'
      })
      .then(function() {
        $('#tweet-text').val("");
        loadTweets();
        
      })
    }
    
  })


  const loadTweets = function() {
    
    $.ajax("/tweets/")
    .then(function(data) {
      renderTweets(data)
    });
  }
  loadTweets()


});
