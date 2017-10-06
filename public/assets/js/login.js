
// ========================================================================== //
// ----------------------- email and password validation --------------------//
// ========================================================================== //

$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        email: {
          required: true,
          // Specify that email should be validated
          // by the built-in "email" rule
          email: true
        },
        password: {
          required: true,
          minlength: 5
        }
      },
      // Specify validation error messages
      messages: {
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        email: "Please enter a valid email address"
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