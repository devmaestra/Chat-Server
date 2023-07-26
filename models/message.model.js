const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    date: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    owner_id: {
        type: String,
    },
    room_id:{
        type: String
    }

});

module.exports = mongoose.model('Message', MessageSchema);