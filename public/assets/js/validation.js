
// ========================================================================== //
// ----------------------- email and password validation --------------------//
// ========================================================================== //

$(function() {
    // Initialize form validation on the registration/login form.
    // It has the name attribute "validation"
    $("form[name='validation']").validate({
      // Specify validation rules
      rules: {
        username: {
          required: true,
          //email: true
        },
        teamName: {
          required: false,
        },
        password: {
          required: true,
          minlength: 3
        },
        confirmPassword: { 
          equalTo: "#password",
          minlength: 3
           
        }
      },
      // Specify validation error messages
      messages: {
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 3 characters long"
        },
        confirmPassword:{
          required: "Please confirm password"
        },

        username: "Please provide a usename",

        teamName: "Please provide the team name"
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });
  });


// ========================================================================== //
// ======== old email and password validation may used later ========//
// ========================================================================== //

// $( ".input" ).focusin(function() {
//     $( this ).find( "span" ).animate({"opacity":"0"}, 200);
//   });
  
//   $( ".input" ).focusout(function() {
//     $( this ).find( "span" ).animate({"opacity":"1"}, 300);
//   });
  
//   $(".login").submit(function(){
//     $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
//     $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
//     $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
//     $("input").css({"border-color":"#2ecc71"});
//     return false;
//   });