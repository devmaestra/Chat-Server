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
router.get('/:id', async (req, res) => {
    try {
    
        const { id } = req.params;
        const getRoom = await Room.findOne({_id: id});
        
        getRoom ?
            res.status(200).json({
                getRoom
            }) :
            res.status(404).json({
                messages: 'No room found'
            })

    } catch (err) {
        errorResponse(res, err)
    }
});


//Get All Rooms:
router.get('/', async(req, res) => {
    try {

        const getAllRooms = await Room.find();
        
        getAllRooms ?
            res.status(200).json({
                getAllRooms
            }) :
            res.status(404).json({
                message: `No rooms found`
            });

    } catch (err) {
        errorResponse(res, err);
    }
});

//Update a Room:
router.patch('/:id', validateSession, async(req, res) => {
    try{

        const { id } = req.params;

        const filter = { _id: id, owner_id: req.user._id}

        const info = req.body;
        
        const returnOption = {new: true};

        const updated = await Room.findOneAndUpdate(filter, info, returnOption);

        res.status(200).json({
            message: `${updated.title} Updated!`,
            updated
        })

    } catch (err) {
        errorResponse(res, err);
    }
})

//Delete A Room:
router.delete('/:id', validateSession, async(req, res) => {
    try {
        const { id } = req.params;

        const deleteRoom = await Room.deleteOne({_id: id, owner_id: req.user._id});

        deleteRoom.deletedCount ?
            res.status(200).json({
                message: 'Room removed!'
            }) :
            res.status(404).json({
                message: "No room in collection!"
            })
        
    } catch (err) {
        errorResponse(res, err);
    }
});
module.exports = router;
