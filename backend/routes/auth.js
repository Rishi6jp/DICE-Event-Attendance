const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {auth} = require('../middleware/auth')

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const {name, email, password } = req.body;
    try{
        const existing = await User.findOne ({ email });
        if(existing) return res.status(400).json({ message: 'User Exists' });

        const hashed = await bcrypt.hash(password, 10); 
        const user = await User.create({ name, email, password: hashed});

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user });
    } catch(err) {
        console.error("Register error:", err); // ✅ this is critical
        res.status(500).json({ message: 'Error registering user'});

    }
});

// Login
router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, user });
    }catch(err){
        res.status(500).json({ message: 'Login error' });
    }
})

//Check Blacklist Status
router.get('/check-blacklist', auth, async(req, res) => {
    try{
        const user = await User.findOne(req.user.id);
        res.json({ message: user.isBlacklist ? 'You are Blacklisted': 'You are NOT Blacklisted'})
    } catch(err) {
        res.status(500).json({ message: 'Faild to fetch status' });
    }
})

module.exports = router;