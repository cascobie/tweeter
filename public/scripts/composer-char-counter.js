$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    // console.log($(this).val())
    const textLength = $(this).val().length;
    // console.log(140 - textLength)
    $(".counter").text(140 - textLength);
    if (textLength > 140) {
      $(".counter").css("color", "red")
    } else {
      $(".counter").css("color", "#545149")
    }
  })
});

