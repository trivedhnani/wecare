const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  let pwRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$/;
  var validpw = pwRegex.test(data.password); 
  if(!validpw) {
    errors.password = "This is not a strong Password!\r Please enter a password that is Maximum of 8 characters, contains atleast 1 Number, atleast one capital letter, atleast one lower case and atleast one speacial character";
  }
  //phone check
  let regEx1 = /^(\+\d{1,3} ?)?(\(\d{1,5}\)|\d{1,5}) ?\d{3} ?\d{0,7}( (x|xtn|ext|extn|pax|pbx|extension)?\.? ?\d{2-5})?$/i;
  let validPh = regEx1.test(data.phone);
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  } else if(!validPh) {
    errors.phone = "Phone is invalid";
  }
  //address check
  if (Validator.isEmpty(data.address)) {
    errors.address = "Address is required";
  }
  //zip check
  var regEx = /^(\d{5}(-\d{4})?|([a-z][a-z]?\d\d?|[a-z{2}\d[a-z]) ?\d[a-z][a-z])$/i;
  var validzip = regEx.test(data.zip);

  if (Validator.isEmpty(data.zip)) {
    errors.zip = "Zip is required";
  }else if(!validzip) {
    errors.zip = "Zipcode is invalid";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};