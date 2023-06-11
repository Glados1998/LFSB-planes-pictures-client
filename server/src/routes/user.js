dotenv = require('dotenv').config();
const express = require ( 'express' );
const router = express.Router ();
const User = require ( '../models/user.model' );
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Use Express session
router.use(expressSession({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}));

router.get ( '/' , async (req , res) => {
    try {
        const users = await User.find();
        res.status ( 200 ).json ( users );
    } catch (error) {
        res.status ( 500 ).json ( { message: error.message } );
    }
} );

router.get ( '/:id' , async (req , res) => {
    try {
        const user = await User.findById( req.params.id );
        res.status ( 200 ).json ( user );
    } catch (error) {
        res.status ( 500 ).json ( { message: error.message } );
    }
} );

router.post ( '/create' , async (req , res) => {
    try {
        const user = await User.create ( req.body );
        res.status ( 200 ).json ( user );
    } catch (error) {
        res.status ( 500 ).json ( { message: error.message } );
    }
} );

router.put ( '/:id/edit' , async (req , res) => {
    try {
        const user = await User.findByIdAndUpdate( req.params.id, req.body );
        res.status ( 200 ).json ( user );
    } catch (error) {
        res.status ( 500 ).json ( { message: error.message } );
    }
} );

router.delete ( '/:id/delete' , async (req , res) => {
    try {
        const user = await User.findByIdAndDelete( req.params.id );
        res.status ( 200 ).json ( user );
    } catch (error) {
        res.status ( 500 ).json ( { message: error.message } );
    }
} );

router.post('/login', async (req, res) => {
    try {
        // Try to find the user with the provided username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: "Incorrect username" });
        }

        // Compare the provided password with the one stored in the DB
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // If the username and password both match, then login the user
        req.session.user = user;

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    // Destroy the session and logout the user
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }

        res.status(200).json({ message: "Logged out successfully" });
    });
});

router.post('/reset-password', async (req, res) => {
    try {
        // Generate a token
        const buffer = crypto.randomBytes(20);
        const token = buffer.toString('hex');

        // Get the user with the given email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'No account with that email address exists.' });
        }

        // Set reset token and expiration
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send an email to the user with the reset token
        const transporter = nodemailer.createTransport({ /* transport options */ });
        const mailOptions = {
            to: user.email,
            from: 'passwordreset@example.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset-password/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        transporter.sendMail(mailOptions, function(error) {
            if (error) {
                return res.status(500).json({ message: error.message });
            }

            res.status(200).json({ message: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to reset password
router.post('/reset-password/:token', async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
        }

        // Update the password
        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
