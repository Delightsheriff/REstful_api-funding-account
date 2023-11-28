const express = require("express");
const {
  getAllUsers,
  userSignUp,
  userLogin,
  fundWallet,
} = require("../controllers/userWalletCtrl");
const {
  validateUserLogin,
  validateUserSignup,
  validateFundAccount,
} = require("../middlewares/userValidation");

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users/signup", validateUserSignup, userSignUp);
router.post("/users/login", validateUserLogin, userLogin);
router.post("/users/fund-wallet", validateFundAccount, fundWallet);

module.exports = router;
