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
                await User.findByIdAndUpdate(userId, {isBlacklist: true});

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

module.exports = router;
