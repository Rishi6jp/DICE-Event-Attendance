const express = require('express');
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    event_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requierd: true
    },
    answer:[{
        label: String,
        answer:String
    }],
    attended: {type: Boolean, default: false},
    registered_at: {type: Date, default: Date.now},
}, {timestamps: true});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;