const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
// Require User model
const User = require('../models/User');

module.exports = app => {
    // Create a New User
    app.post(
        '/api/users', 
        [
            check('name', 'Name is required.').not().isEmpty(),
            check('email', 'Please include a valid email address.').isEmail(),
            check('password', 'Please enter a password with 6 or more characters.').isLength({min:6})
        ],
        async (req,res) => {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            // Get data from request body
            const { name, email, password } = req.body;

            try {
                // Check if user exists
                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ errors: [{ msg: 'User already exists.' }] });
                }

                // Get avatar
                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                // Create User object
                user = new User({
                    name,
                    email,
                    avatar,
                    password
                });

                // Encrypt password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);

                // Save User
                await user.save();

                // Return JWT
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                jwt.sign(
                    payload, 
                    keys.jwtSecret,
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        return res.json({ token });
                    }
                )
            } 
            catch(err) {
                // Server error occured
                console.error(err.message);
                res.status(500).send('Server error');
            }
        }
    );
}