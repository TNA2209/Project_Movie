const express = require("express");
const bcrypt = require("bcrypt");
const EmployeeModel = require("../models/Employee");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();


// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ email: user.email }, jwtSecret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });

        if (email === process.env.EMAIL_USER) {
          res.status(200).json({ status: "admin", message: "Admin login" });
        } else {
          res.status(200).json({ status: "success", message: "Login successful" });
        }
      } else {
        res.status(400).json("The password is incorrect");
      }
    } else {
      res.status(404).json("No record existed");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});


// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
       http://localhost:5173/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        return res.json({ status: false, message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

// Reset password route
router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await EmployeeModel.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json("Password reset token is invalid or has expired.");
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ status: "success", message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

// Logout route
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logged out successfully");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

// Create user route
router.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// Read user route
router.get("/users/:id", async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await EmployeeModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});
// Update user route
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await EmployeeModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

// Delete user route
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json("User deleted");
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
