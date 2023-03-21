require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");

const app = express();

app.use(express.json({ limit: "5mb" }));

app.post("/create", async (req, res) => {
  try {
    console.log("Request Body : ", req.body);
    // Get user input
    const { phone, otp } = req.body;
    const user = {};
    // Validate user input
    if (!(phone && otp)) {
      res.status(400).send("All input is required");
    }
    // Validate Otp
    if (phone && (otp === 1835)) {
      const token = await auth.generateAuthToken({phone});
      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/verify", auth.verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
