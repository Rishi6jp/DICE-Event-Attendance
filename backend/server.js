const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.error('MongoDb Error: ', err));

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    console.log("Server running on Port 5000");
})
