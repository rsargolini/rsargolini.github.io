// Register Page - Scripts 

// Don't run any JS until DOM in built
window.onload = function () {

    // Get Form Element from DOM
    var registrationForm = document.getElementById('registrationForm');

    // get Alert Message Elements
    var mismatchMsg = document.getElementById('mismatchMsg');

    // Password - Confirm Password Mismatch
    // Bind Submit Event Handler to Form
    registrationForm.onsubmit = function (submitEvent) {

        // Get Form fields from DOM
        var inputPassword = document.getElementById('inputPassword');
        var confirmPassword = document.getElementById('confirmPassword');

        // Get User input values from form fields
        var inputPasswordValue = inputPassword.value;
        var confirmPasswordValue = confirmPassword.value;

        // User did not enter matching Confirm Password
        if (confirmPasswordValue != inputPasswordValue) {
            // Show Mismatch Message
            mismatchMsg.style.display = 'block';

            // Reset Password and Confirm Password back to placeholder values
            inputPassword.value = '';
            confirmPassword.value = '';

            // Return Cursor focus to Password field
            document.getElementById('inputPassword').focus();
            return false;
        }
    }
    // On Reset hide Password - Confirm Password error message
    // Bind Submit Event Handler to Form
    registrationForm.onreset = function (resetEvent) {
        mismatchMsg.style.display = 'none';
    }

}
