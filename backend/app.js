require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const config = require('./config/database');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

// Check for DB errors
db.on('error', (err) => {
    console.log(err);
});

// Route Files
const users = require('./routes/users');
app.use('/users', users);

app.listen(port, function () {
    console.log('Server started!');
});