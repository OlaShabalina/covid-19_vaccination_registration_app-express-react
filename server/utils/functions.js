// additional functions for input validation

function isNameValid(name) {
  // name shouldn't have special characters
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return !specialChars.test(name); 
}

function isDateValid(date) {

  // formating data from the input to match the same style
  const dateCrleared = new Date(date)
  const today = new Date(new Date().toDateString()); 

  return dateCrleared >= today;
}

module.exports = {
  isNameValid,
  isDateValid
};