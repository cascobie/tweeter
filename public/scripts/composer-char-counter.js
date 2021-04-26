// Function to update character counter
$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    // gets the value of the length of text entered into the text-area
    const textLength = $(this).val().length;
    // sets the value of the counter to 140 less the value obtained above
    $(".counter").text(140 - textLength);
    // If the characters exceed the 140 character limit, the text turns red, otherwise it stays grey.
    if (textLength > 140) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "#545149")
    }
  })
});

