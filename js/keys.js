$(document).keydown(function(event) {
    event.preventDefault();
    $("#key-box").html(event.keyCode);
  });