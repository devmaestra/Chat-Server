require('dotenv').config();
const mongoose = require('mongoose');
const MONGO = process.env.MONGO;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const users = require('./controllers/users.controller');
const rooms = require('./controllers/rooms.controller');
const messages = require('./controllers/messages.controller');
