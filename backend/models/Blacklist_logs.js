const express = require('express');
const mongoose = require('mongoose');

const blacklist_logSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blacklisted_at:{
        type: Date,
        default: Date.now
    },
    reason: String
}, {timestamps: true});

const Blacklist_log = mongoose.model('Blacklist_log', blacklist_logSchema);
module.exports = Blacklist_log;
