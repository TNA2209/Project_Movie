const express = require('express');
const cors = require('cors');
const mongoose = require('./db');
const User = require('./routes/user');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST",'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

app.use('/auth', User); 

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
