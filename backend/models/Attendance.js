const express = require('express');
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    event_id :{
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'Event'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['attended','no-show'],
        default: 'attended'
    },
    marked_at:{
        type: Date,
        default: Date.now
    },
    method:{
        type: String,
        enum: ['qr', 'otp', 'manual'],
        required: true
        }
},{ timestamps: true})

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;