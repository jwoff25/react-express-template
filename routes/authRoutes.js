const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const passport = require("passport");
require("../middleware/passport");

module.exports = (app) => {
  // Register user
  app.post(
    "/api/register",
    [
      check("username", "Username is required.").not().isEmpty(),
      check("email", "Please include a valid email address.").isEmail(),
      check(
        "password",
        "Please enter a password with 8 or more characters."
      ).isLength({ min: 8 }),
      check("confirmPassword", "Please enter password confirmation.")
        .not()
        .isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      // -- Handle Bad Requests --
      // If there are any validation errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, email, password, confirmPassword } = req.body;
      // If the passwords don't match
      if (password != confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
      }
      try {
        // If username exists
        const usernameExists = await User.find({ username: username });
        const emailExists = await User.find({ email: email });
        if (usernameExists.length > 0) {
          return res.status(400).json({ error: "Username already exists." });
        }
        if (emailExists.length > 0) {
          return res.status(400).json({ error: "Email already exists." });
        }

        // -- User Creation --
        // Salt and hash password
        const salt = await bcrypt.genSalt(10);
        const saltedPass = await bcrypt.hash(password, salt);
        // Make user object
        const userObject = new User({
          username: username,
          email: email,
          password: saltedPass,
        });
        // Make request to DB
        await userObject.save();

        // -- JWT Creation --
        const payload = {
          user: {
            id: userObject.id,
          },
        };

        jwt.sign(
          payload,
          keys.jwtSecret,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Server error" });
      }
    }
  );

  // Log in
  app.post(
    "/api/login",
    [
      check("email", "Please include a valid email address.").isEmail(),
      check("password", "Password is required.").exists(),
    ],
    async (req, res) => {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        // Get the user
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
        // Compare passwords
        const passMatch = bcrypt.compare(password, user.password);
        if (!passMatch) {
          return res.status(400).json({ error: "Incorrect password." });
        }
        // Create token
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          keys.jwtSecret,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error." });
      }
    }
  );
};
