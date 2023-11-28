//users signup validation
const validateUserSignup = (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    city,
    state,
    country,
    email,
    password,
  } = req.body;
  const errorList = [];

  // Validate name
  if (!firstName) {
    errorList.push("Please enter your firstname");
  }
  if (!lastName) {
    errorList.push("Please enter your lastname");
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
  } else if (password.length < 8) {
    errorList.push("Password must be at least 8 characters long");
  } else if (!/[A-Z]/.test(password)) {
    errorList.push("Password must contain at least one uppercase letter");
  } else if (!/[0-9]/.test(password)) {
    errorList.push("Password must contain at least one digit");
  }

  // Validate phonenumber
  if (!phoneNumber) {
    errorList.push("Please enter your Phonenumber");
  }

  if (!city) {
    errorList.push("Please enter your state");
  }
  if (!state) {
    errorList.push("Please enter your state");
  }
  if (!country) {
    errorList.push("Please enter your country");
  }

  // Check for any errors
  if (errorList.length > 0) {
    return res.status(400).json({ errors: errorList });
  }

  // Proceed to the next middleware if no errors
  next();
};

//users login validation
const validateUserLogin = (req, res, next) => {
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

// validateFundAccount.js

const validateFundAccount = (req, res, next) => {
  const { amount } = req.body;
  const errors = [];

  // Validate amount
  if (!amount || isNaN(amount) || amount <= 0) {
    errors.push(
      "Invalid amount. Please enter a valid amount to fund your account."
    );
  }

  // Check if there are any errors
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = { validateUserSignup, validateUserLogin, validateFundAccount };
