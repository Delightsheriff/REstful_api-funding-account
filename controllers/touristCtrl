const Tourists = require("../models/touristModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//generating passkeys
function generateRandomPasskey(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let passkey = "";

  for (let i = 0; i < length; i++) {
    passkey += characters[Math.floor(Math.random() * characters.length)];
  }

  return passkey;
}

//get all tourists
const getAllTourist = async (req, res) => {
  try {
    const allTourists = await Tourists.find();

    return res.status(200).json({
      message: "Sucessful from controller",
      count: allTourists.length,
      allTourists,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//tourist signup
const touristSignUp = async (req, res) => {
  try {
    const { name, email, nationality, purposeOfVisit, password } = req.body;
    const doesExist = await Tourists.findOne({ email });

    if (doesExist) {
      return res
        .status(400)
        .json({ message: "This user account already exixt!" });
    }
    const passkey = generateRandomPasskey(6);
    const hashedPasskey = await bcrypt.hash(passkey, 12);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newTourist = new Tourists({
      name,
      email,
      password: hashedPassword,
      passkey: hashedPasskey,
      nationality,
      purposeOfVisit,
    });

    await newTourist.save();

    return res.status(200).json({
      mesasge: "Registration successful",
      Tourist: newTourist,
      passkey: passkey,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const touristLogin = async (req, res) => {
  try {
    const { email, passkey } = req.body;

    // Retrieve the user from the database based on the provided email
    const existingTourist = await Tourists.findOne({ email });

    if (!existingTourist) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the plain-text passkey with the stored hashed passkey
    const isMatch = await bcrypt.compare(passkey, existingTourist.passkey);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email & P asskey" });
    }

    // Generate tokens
    const payload = {
      id: existingTourist._id,
      role: "user",
    };
    const activeToken = await jwt.sign(payload, process.env.Token, {
      expiresIn: "5h",
    });
    const accessToken = await jwt.sign(payload, process.env.Token, {
      expiresIn: "3m",
    });
    const refreshToken = await jwt.sign(payload, process.env.Token, {
      expiresIn: "3d",
    });

    // Update the user's refresh token in the database
    existingTourist.refreshToken = refreshToken;
    await existingTourist.save();

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: existingTourist,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTourist, touristSignUp, touristLogin };
