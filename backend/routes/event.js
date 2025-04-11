const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

//create a event
router.post('/', async (req, res) => {
    try{
        console.log("recieved event data", req.body);
        const event = await Event.create(req.body);
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

module.exports = router;
