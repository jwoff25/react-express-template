const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
// Require User model
const User = require('../models/User');

module.exports = app => {
    app.get('/api/auth', auth, async (req,res) => {
        try {
            // Find user by id 
            const user = await User.findById(req.user.id).select('-password');

            res.send(user);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // Login
    app.post(
        '/api/auth', 
        [
            check('email', 'Please include a valid email address.').isEmail(),
            check('password', 'Password is required.').exists()
        ],
        async (req,res) => {
            // Validate input
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            // Get data from request body
            const { email, password } = req.body;

            try {
                // Check if email exists
                let user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
                }

                // Match credentials
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ errors: [{ msg: 'Invalid credentials.' }] });
                }

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
                        res.json({ token });
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