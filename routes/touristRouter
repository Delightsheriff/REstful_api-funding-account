const express = require("express");
const {
  getAllTourist,
  touristSignUp,
  touristLogin,
} = require("../controllers/touristCtrl");
const {
  validateTouristSignup,
  validateTouristLogin,
} = require("../middlewares/validations");

const router = express.Router();

router.get("/tourists", getAllTourist);
router.post("/tourists/signup", validateTouristSignup, touristSignUp);
router.post("/tourists/login", validateTouristLogin, touristLogin);

module.exports = router;
