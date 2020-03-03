const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = app => {
    // Get current user's profile
    app.get("/api/profile/me", auth, async (req, res) => {
        try {
            // Find profile for current user and populate it with name and avatar
            const profile = await Profile.findOne({
                user: req.user.id
            }).populate("user", ["name", "avatar"]);
            // If not found, return error
            if (!profile) {
                return res
                    .status(400)
                    .send({ msg: "There is no profile for this user." });
            }
            // Return profile
            res.send(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    });

    // Create profile
    app.post(
        "/api/profile",
        [
            auth,
            [
                check("location", "Location is required.")
                    .not()
                    .isEmpty()
            ]
        ],
        async (req, res) => {
            // Validate input
            const errors = validationResult(req);
            // If there are errors, send them
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // If no errors, get the fields from input
            const {
                website,
                location,
                youtube,
                twitter,
                instagram,
                facebook
            } = req.body;
            // Create profile object
            const profileObject = {};
            // Basic profile
            profileObject.user = req.user.id;
            if (website) profileObject.website = website;
            if (location) profileObject.location = location;
            // Profile -> Social
            profileObject.social = {};
            if (youtube) profileObject.social.youtube = youtube;
            if (instagram) profileObject.social.instagram = instagram;
            if (twitter) profileObject.social.twitter = twitter;
            if (facebook) profileObject.social.facebook = facebook;
            // Create new profile
            try {
                // See if profile exists already
                let profile = await Profile.findOne({
                    user: profileObject.user
                });
                // If it exists, update it
                if (profile) {
                    profile = await Profile.findOneAndUpdate(
                        { user: profileObject.user },
                        { $set: profileObject },
                        { new: true }
                    );
                }
                // Else create a new profile
                else {
                    // Create profile object
                    profile = new Profile(profileObject);
                    // Save profile
                    await profile.save();
                }
                res.json(profile);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error");
            }
        }
    );

    // Get all profiles
    app.get("/api/profiles", async (req, res) => {
        try {
            const profiles = await Profile.find().populate("user", [
                "name",
                "avatar"
            ]);
            res.json(profiles);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error.");
        }
    });

    // Get profile by ID
    app.get("/api/profile/user/:user_id", async (req, res) => {
        try {
            // Get user id from URL param
            const userid = req.params.user_id;
            // Find user based on ID
            const profile = await Profile.findOne({
                user: userid
            }).populate("user", ["name", "avatar"]);
            // If user doesn't exist, return 400
            if (!profile)
                return res.status(400).json({ msg: "Profile not found." });
            // Return the user
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            // If error is an incorrect ID, send profile not found message
            if (error.kind == "ObjectId")
                return res.status(400).json({ msg: "Profile not found." });
            res.status(500).send("Server error.");
        }
    });

    // Delete profile/user/anything else attached to it
    app.delete("/api/profile", auth, async (req, res) => {
        try {
            // TODO: Remove anything else attached to the user
            const userid = req.user.id;
            // Remove profile
            await Profile.findOneAndRemove({ user: userid });
            // Remove user
            await User.findOneAndRemove({ _id: userid });
            res.json({ msg: "User removed." });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error.");
        }
    });
};
