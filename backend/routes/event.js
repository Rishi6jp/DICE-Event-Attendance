const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Event = require('../models/Event');
const {auth, isAdmin} = require('../middleware/auth');
const Registration = require('../models/Registration');
const Blacklist_log = require('../models/Blacklist_logs')

//create a event
router.post('/',auth,isAdmin, async (req, res) => {
    try{
        console.log("recieved event data", req.body);
        const event = await Event.create({...req.body, createdBy: req.user.id});
        console.log('Event Created: ', event);
        res.status(200).json(event);
    }catch(err){
        console.error('Error Created Event:', err);
        res.status(500).json({ message: 'Failed to create Event' });
    }
});

// get all the event
router.get('/', async (req, res) => {
    try{
        const events = await Event.find();
        res.json(events);
    } catch(err) {
        res.status(500).json({ message: 'Failed to load ALl Events'});
    }
})

// Event Detailed View
router.get('/:id', async (req, res) => {
    try{
        const event = await Event.findById(req.params.id)
        if(!event) return res.status(404).json({message: 'Event do not exist'});

        //show all the details of event
        res.json(event)
    } catch(err) {
        console.error("Get Error details: ", err);
        res.status(500).json({message: 'error loading events details'})
    }
})

router.post('/blacklist/:eventId', auth, isAdmin, async (req, res) => {
    const {eventId} = req.params;

    try{
        const noShows  = await Registration.find({
            event_id: eventId,
            attended: false
        });


        const userIds = noShows.map(r => r.user_id);

        let blacklistCount = 0;

        for (const userId of userIds){
            const totalNoShows = await Registration.countDocuments({
                user_id: userId,
                attended: false
            });

            if(totalNoShows >= 3) {
                await User.findByIdAndUpdate(userId, {isBlacklisted: true});

                await Blacklist_log.create({
                    student_id: userId,
                    reason: `Blacklisted after ${totalNoShows} no-shows`,
                });

                blacklistedCount++;
            }
        }

        res.json({ message: `Blacklisted ${blacklistedCount} students (3 or more no-shows)`});

    }catch (err) {
        console.error('Blacklist Error:', err);
        res.status(500).json({ message: 'Failed to blacklist students' });
    }
})

router.post('/:eventId/generate-otp', auth, isAdmin, async (req, res) => {
    const { eventId } = req.params;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
  
    try {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      event.otp = { code: otp, generatedAt: new Date() };
      await event.save();
  
      res.json({ otp });
    } catch (err) {
      console.error('OTP generation failed:', err);
      res.status(500).json({ message: 'Failed to generate OTP' });
    }
});


router.post('/mark-attendance/:eventId', auth, async (req, res) => {
    const { eventId } = req.params;
    const { otp } = req.body;
  
    try {
      const event = await Event.findById(eventId);
      if (!event || !event.otp || event.otp.code !== otp) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      const registration = await Registration.findOne({ event_id: eventId, user_id: req.user.id });
      if (!registration || registration.attended) {
        return res.status(400).json({ message: 'Already marked or not registered' });
      }
  
      registration.attended = true;
      await registration.save();
  
      await Attendance.create({
        event_id: eventId,
        user_id: req.user.id,
        status: 'attended',
        method: 'otp',
      });
  
      res.json({ message: 'Attendance marked via OTP' });
    } catch (err) {
      console.error('OTP attendance failed:', err);
      res.status(500).json({ message: 'Internal error' });
    }
});

module.exports = router;
