// Register Page - Scripts 

// Password - Confirm Password Mismatch

// Don't run any JS until DOM in built
window.onload = function () {

    // Get Form Element from DOM
    var registrationForm = document.getElementById('registrationForm');

    // get Alert Message Elements
    var mismatchMsg = document.getElementById('mismatchMsg');

    // Bind Submit Event Handler to Form
    registrationForm.onsubmit = function (submitEvent) {

        // Get Form fields from DOM
        var inputPassword = document.getElementById('inputPassword');
        var confirmPassword = document.getElementById('confirmPassword');

        // Get User input values from form fields
        var inputPasswordValue = inputPassword.value;
        var confirmPasswordValue = confirmPassword.value;

        // Check to ensure User entered values
        if (confirmPasswordValue != inputPasswordValue) {
            // User did not enter matching Confirm Password
            // Show Mismatch Message
            mismatchMsg.style.display = 'block';
            document.getElementById('inputPassword').focus();
            return false;
        }
    }
    // Bind Submit Event Handler to Form
    registrationForm.onreset = function (resetEvent) {
        mismatchMsg.style.display = 'none';
        inputFName  ;
    }

}
