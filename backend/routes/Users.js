const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

//sign up

router.post("/api/v1/signup", async (req, res) => {
  //email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //check if all required fields are present
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  //check if email is valid

  if (!emailPattern.test(req.body.email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  //check if password is valid

  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email });
    //check if user already exists
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //create user

    const user = new User({ firstName, lastName, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ firstName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//login

router.post("/api/v1/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //check if fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //check if user exists

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ firstName: user.firstName, token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all users

router.get("/api/v1/users/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get user by id

router.get("/api/v1/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update user by id

router.patch("/api/v1/users/update/:id", findUser, async (req, res) => {
  if (req.body.firstName) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.email) {
    res.user.email = req.body.email;
  }
  if (req.body.password) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res
      .status(200)
      .json({ message: "User Updated Successfuly", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete user by id

router.delete("/api/v1/users/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// find user middleware if needed

async function findUser(req, res, next) {
  let selectedUser;
  try {
    const foundUser = await User.findById(req.params.id);
    selectedUser = foundUser;
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
  res.user = selectedUser;
  next();
}

module.exports = router;
