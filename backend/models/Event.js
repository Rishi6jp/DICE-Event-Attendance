const express = require('express');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    attendanceMarked: Boolean
})

const Event = mongoose.model('Event', eventSchema)