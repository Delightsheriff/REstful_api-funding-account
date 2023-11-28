const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true, lowercase: true },
    lastName: { type: String, require: true, lowercase: true },

    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String, // Corrected from "String" to String
      description: "The user's password",
      required: true,
      minlength: 8,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    city: {
      type: String,
      require: true,
      lowercase: true,
    },
    state: {
      type: String,
      require: true,
      lowercase: true,
    },
    country: {
      type: String,
      require: true,
      lowercase: true,
    },
    walletId: { type: String, ref: "Wallet" },
    walletRef: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  },
  { timestamps: true }
);

// Extend the user schema to create the wallet schema
const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    description: "Current balance of the wallet",
    default: 0,
    required: true,
  },
  transactions: [
    {
      transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        description: "Unique identifier for the transaction",
        required: true,
      },
      amount: {
        type: Number,
        description: "Amount of the transaction",
        required: true,
      },
      timestamp: {
        type: Date,
        description: "Timestamp of the transaction",
        default: Date.now(),
        required: true,
      },
      transactionType: {
        type: String,
        description: "Type of transaction (e.g., deposit, withdrawal)",
        required: true,
        enum: ["deposit", "withdrawal"],
      },
    },
  ],
  walletId: { type: String },
  userName: { type: String, lowercase: true },
});

// Create the Users model
const Users = mongoose.model("Users", userSchema);

// Create the Wallet model
const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = { Users, Wallet };
