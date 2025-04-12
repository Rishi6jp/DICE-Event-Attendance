const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event')
const {auth, isAdmin} = require('../middleware/auth');
const Attendance = require('../models/Attendance');

// Register for an event
router.post('/:eventId',auth,  async (req, res) => {
    const {eventId} = req.params;
    const { answers } = req.body;

    try{
        //check if student already registered for the event
        const existing = await Registration.findOne({ event_id: eventId, user_id: req.user.id});
        if(existing) return res.json({ message: 'Already registered for the event'});
        // find the event id by id
        const event = await Event.findById(eventId);
        if(!event) return res.json({ message: 'Event Do not exits'});
        // check if seats are avaialable
        if(event.seat <= 0) return res.json({message: 'No seats available for the event'});

        // decrement the seat count for the event
        event.seat -= 1;
        await event.save();
        // create the registration
        const registration = await Registration.create({
            event_id: eventId,
            user_id: req.user.id,
            answer: answers,
            registered_at:new Date()
        })
        res.json({message: "Successfully registered for the event"});

    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'Failed to register for the Event'});
    };
});

router.post('/attendance/:eventId' , auth,isAdmin, async (req, res) => {
    const {eventId} = req.params;
    const {userId, method = 'manual'} = req.body;

    try{
        const registration = await Registration.findOne({event_id: eventId, user_id: userId});
        if(!registration){
            return res.json({ message: 'Registration not found'});
        }

        if(registration.attended){
            return res.status(400).json({ message: 'Studnet already marked present'});
        }

        registration.attended = true;
        await registration.save();

        await Attendance.create({
            event_id: eventId,
            user_id: userId,
            status: 'attended',
            method
        });

        res.json({message: 'Marked present'})

    } catch (err) {
        console.error('Attendance marking failed:', err);
        res.status(500).json({ message: 'Failed to mark attendance' });
    };
});

module.exports = router;