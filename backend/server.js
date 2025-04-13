const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.error('MongoDb Error: ', err));

app.use('/api/auth', authRoutes);

const eventRoutes = require('./routes/event');
app.use('/api/events', eventRoutes);

const registrationRoutes = require('./routes/registration');
app.use('/api/registration', registrationRoutes);

const unblacklistRoutes = require('./routes/unblacklist');
app.use('/api/unblacklist', unblacklistRoutes);


app.listen(5000, () => {
    console.log("Server running on Port 5000");
})
