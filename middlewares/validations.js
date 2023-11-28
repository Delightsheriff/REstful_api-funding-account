//tourist signup validation
const validateTouristSignup = (req, res, next) => {
  const { name, email, nationality, purposeOfVisit, password } = req.body;
  const errorList = [];

  // Validate name
  if (!name) {
    errorList.push("Please enter your name");
  }

  // Validate email
  if (!email) {
    errorList.push("Please enter your email");
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    errorList.push("Please enter a valid email address");
  }

  // Validate password
  if (!password) {
    errorList.push("Please enter a password");
  } else if (password.length < 6) {
    errorList.push("Password must be at least 6 characters long");
  } else if (!/[A-Z]/.test(password)) {
    errorList.push("Password must contain at least one uppercase letter");
  } else if (!/[0-9]/.test(password)) {
    errorList.push("Password must contain at least one digit");
  }

  // Validate nationality
  if (!nationality) {
    errorList.push("Please enter your nationality");
  }

  // Validate purpose of visit
  if (!purposeOfVisit) {
    errorList.push("Please enter the purpose of your visit");
  }

  // Check for any errors
  if (errorList.length > 0) {
    return res.status(400).json({ errors: errorList });
  }

  // Proceed to the next middleware if no errors
  next();
};

//tourist login validation
const validateTouristLogin = (req, res, next) => {
  const { password, email } = req.body;

  error = [];

  if (!password) {
    error.push("Please enter a password.");
  }
  if (!email) {
    error.push("Please enter your email");
  }

  if (error.length > 0) {
    return res.status(400).json(error);
  }

  next();
};

module.exports = { validateTouristSignup, validateTouristLogin };
