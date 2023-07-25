require('dotenv').config();
const mongoose = require('mongoose');
const MONGO = process.env.MONGO;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const user = require('./controllers/user.controller');
const room = require('./controllers/room.controller');
const message = require('./controllers/message.controller');
