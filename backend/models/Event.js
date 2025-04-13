const express = require('express')
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  seat: Number,
  event_date: {
    type: Date,
    required: true
  },
  venue: String,
  
  form_fields: [{
    label: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'number', 'email', 'dropdown', 'checkboxes', 'file'],
      required: true
    },
    required: { type: Boolean, default: false },
    options: {
      type: [String],
      default: [] // makes it safer when type is not dropdown/checkbox
    }
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  otp: {
    code: { type: String },
    generatedAt: { type: Date },
  },

}, { timestamps: true });


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

