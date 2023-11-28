const mongoose = require("mongoose");
const { Users, Wallet } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//generate account number
function generateAccountNumber() {
  const accountNumberPrefix = "30";
  let accountNumber = accountNumberPrefix;

  for (let i = 0; i < 8; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }

  return accountNumber;
}

//get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();

    return res.status(200).json({
      message: "Sucessful from controller",
      count: allUsers.length,
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//user signup
const userSignUp = async (req, res) => {
  try {
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
    const doesExist = await Users.findOne({ email });

    if (doesExist) {
      return res
        .status(400)
        .json({ message: "This user account already exixt!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newWallet = new Wallet({
      walletId: generateAccountNumber(),
      userName: `${firstName} ${lastName}`,
    });
    await newWallet.save();

    const newUser = new Users({
      firstName,
      lastName,
      phoneNumber,
      city,
      state,
      country,
      email,
      password: hashedPassword,
      walletId: newWallet.walletId,
      walletRef: newWallet._id,
    });

    await newUser.save();

    return res.status(200).json({
      message: "Registration successful",
      User: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user from the database based on the provided email
    const existingUser = await Users.findOne({ email }).populate("walletRef");

    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the plain-text passkey with the stored hashed passkey
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email & Password" });
    }

    // Generate tokens
    const payload = {
      id: existingUser._id,
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
    existingUser.refreshToken = refreshToken;

    await existingUser.save();
    console.log(existingUser.walletRef);

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      user: existingUser,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fundWallet = async (req, res) => {
  try {
    // Assuming user information is attached to the request
    const { walletId, amount } = req.body;

    // Find the user based on the userId
    const user = await Users.findOne({ walletId }).populate("walletRef");
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update balance and transactions
    user.walletRef.balance += parseFloat(amount);
    user.walletRef.transactions.push({
      transactionId: new mongoose.Types.ObjectId(),
      amount: parseFloat(amount),
      timestamp: new Date(),
      transactionType: "deposit",
    });

    // Save the updated wallet directly using the Wallet model
    await user.walletRef.save();

    return res.status(200).json({
      message: "Funding successful",
      wallet: user.walletRef,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, userSignUp, userLogin, fundWallet };
