const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
    },
    messages: {
        type: [Object],
    },
    owner_id:{
        type: String
    }

});

module.exports = mongoose.model('Room', RoomSchema);

//type: mongoose.Schema.Types.ObjectId