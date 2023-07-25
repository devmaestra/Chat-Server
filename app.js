require('dotenv').config();
const mongoose = require('mongoose');
const MONGO = process.env.MONGO;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const user = require('./controllers/user.controller');
const room = require('./controllers/room.controller');
const message = require('./controllers/message.controller');

//!MIDDLEWARE 
const log = console.log;
mongoose.connect(`${MONGO}/ChatApp`); 
const db = mongoose.connection;
db.once("open", () => log(`Connected: ${MONGO}`));

app.use(express.json());

//! ROUTES
app.use('/user', user);
app.use('/room', room);
app.use('/message', message);

app.listen(PORT, () => log(`Chat Application Server running on PORT: ${PORT}`));