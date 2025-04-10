const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, enum: ['student', 'admin'], default: 'student'},
    blacklisted: {type: Boolean, default: false},
    absences: {type: Number, default: 0},
})

const User = mongoose.model('User', userSchema)