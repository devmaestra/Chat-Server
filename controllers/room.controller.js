const router = require('express').Router();
const Room = require('../models/room.model');

//Create a Room:
router.post('/', async (req,res) => {
    try {
            const { title, description, messages, owner_id } = req.body;

            const room = new Room({
                title, description, messages, owner_id: req.user.id
            });
    
            const newRoom = await Room.save();
    
            res.status(200).json({
                newRoom,
                message: `${newRoom.title} added to collection!`
            });
    
        } catch (err) {
            errorResponse(res, err);
        }
    });

    //Get One Room: 
module.exports = router;
