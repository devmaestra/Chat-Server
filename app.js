require('dotenv').config();
const mongoose = require('mongoose');
const MONGO = process.env.MONGO;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const users = require('./controllers/user.controller');
const rooms = require('./controllers/room.controller');
const messages = require('./controllers/message.controller');
