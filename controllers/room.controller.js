const router = require('express').Router();
const Room = require('../models/room.model');
const validateSession = require('../middleware/validate-session');

//Create a Room:
router.post('/', validateSession, async (req,res) => {
    try {
            const { title, description, messages } = req.body;

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
