const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');


connectToDB();

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

module.exports = app;