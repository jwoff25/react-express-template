const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const passport = require("passport");

module.exports = (app) => {
  // Get User
  app.get(
    "/api/user",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      res.status(200).json({ user: req.user });
    }
  );

  // Update User
  app.put(
    "/api/user",
    [
      check("username", "Username is required.").not().isEmpty(),
      check("email", "Please include a valid email address.").isEmail(),
    ],
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        // -- Handle Bad Requests --
        // If there are any validation errors
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { username, email } = req.body;
        const payload = {};
        // If username exists
        const usernameExists = await User.find({ username: username });
        const emailExists = await User.find({ email: email });
        if (usernameExists.length === 0) {
          if (username) {
            payload.username = username;
          }
        }
        if (emailExists.length === 0) {
          if (email) {
            payload.email = email;
          }
        }
        if (Object.keys(payload).length === 0) {
          return res.status(400).json({
            error:
              "Could not update either due to existing or empty values for Username / Email.",
          });
        } else {
          const user = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: payload },
            { new: true }
          );
          if (!user) return res.status(404).json({ error: "User not found." });
          return res.status(200).json({ user: user });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
      }
    }
  );

  // Delete user
  app.delete(
    "/api/user",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        // Todo: Delete user's profile and repos as well
        await User.deleteOne({ _id: req.user.id });
        res.status(200).json({ message: "User deleted." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    }
  );
};
