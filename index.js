const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./db");
connectDB();
app.use(express.json());

const touristRoutes = require("./routes/touristRouter");

app.use("/api", touristRoutes);

const PORT = process.env.PORT || 5000;
//APIS
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "Wecome to our Server" });
});
//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
