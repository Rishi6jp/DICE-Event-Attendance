const express = require('express');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true },
    description: String,
    date: {type: Date, required: true},
    location: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false}]
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;