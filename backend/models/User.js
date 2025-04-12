const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true,required: true},
    password: {type: String, requierd: true},
    role: {
        type: String,
        enum: ['student', 'staff', 'admin'],
        default: 'student'
      },
    isBlacklisted: {type: Boolean, default: false},
    registration_history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Registration'}]
}, {timestamps: true});

const User = mongoose.model('User', userSchema)
module.exports = User;