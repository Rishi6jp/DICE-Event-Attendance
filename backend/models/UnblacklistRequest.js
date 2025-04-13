const mongoose = require('mongoose');

const unblacklistRequestSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: String,
    message: String,
    status: {
        type: String,
        enum: ["pending", 'approval', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true});

mongoose.exports = mongoose.model('UnblacklistRequest', unblacklistRequestSchema);