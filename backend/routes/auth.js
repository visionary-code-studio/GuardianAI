const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    console.log('📝 Register Request:', req.body);
    const { fullName, email, password, role, medicalLicense, specialization, dateOfBirth, gender } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('⚠️ User already exists:', email);
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
            medicalLicense,
            specialization,
            dateOfBirth,
            gender
        });

        await user.save();
        console.log('✅ User saved to DB:', user.id);

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('🔑 Token generated successfully');
            res.json({ token, role: user.role });
        });

    } catch (err) {
        console.error('❌ Register Error:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    console.log('🔐 Login Request:', req.body.email);
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('⚠️ User not found:', email);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('⚠️ Password mismatch for:', email);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('🔑 Login successful for:', email);
            res.json({ token, role: user.role });
        });

    } catch (err) {
        console.error('❌ Login Error:', err.message);
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;
