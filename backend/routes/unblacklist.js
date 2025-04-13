const express = require('express');
const router = express.Router();
const {auth, isAdmin} = require('../middleware/auth');
const UnblacklistRequest = require('../models/UnblacklistRequest');

// Post Student sends request
router.post('/', auth, async (req, res) => {
    try{
        const exisitng = await UnblacklistRequest.findOne({
            student_id: req.user.id,
            status: 'pending'
        });

        if(existing) return res.status(400).json({message: 'Already Submitted a pending Request'})

        const { subject, message } = req.body;
        const request = await UnblacklistRequest.create({
            student_id: req.user.id,
            subject,
            message
        });

        res.json({ message: 'Request sent successfully', request });
    }catch (err) {
    console.error('Unblacklist Request Error:', err);
    res.status(500).json({ message: 'Failed to send request' });
  }
});

// GET - Admin fetches all requests
router.get('/', auth, async (req, res) => {
    try {
        const requests = await UnblacklistRequest.find().populate('student_id', 'name email');
        res.json(requests);
    }catch (err) {
        res.status(500).json({ message: 'Failed to fetch requests' });
      }
})

// PATCH - Admin updates status
router.patch('/:id', auth, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const request = await UnblacklistRequest.findByIdAndUpdate(id, { status }, { new: true });
  
      if (status === 'approved') {
        await require('../models/User').findByIdAndUpdate(request.student_id, {
          isBlacklisted: false
        });
      }
  
      res.json({ message: `Request ${status}`, request });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update request' });
    }
});
  
module.exports = router;