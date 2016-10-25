$( document ).ready(function() {
  $("#icon_username, #icon_password").change(function() {
    $('#clear_btn').show();
  });
});

$( document ).ready(function() {
      $('#clear_btn').click(function(){
        $('#clear_btn').hide();
      });
});
