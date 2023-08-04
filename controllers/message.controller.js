const router = require('express').Router();
const Message = require('../models/message.model');
const validateSession = require('../middleware/validate-session');

//CREATE A MESSAGE
router.post('/', validateSession, async (req,res) => {
    try {
            const { date, text, room_id } = req.body;

            const message = new Message({
                date, text, owner_id: req.user.id, room_id});
    
            const newMessage = await message.save();
    
            res.status(200).json({
                newMessage,
                message: `${newMessage.date} new message in your inbox!`
            });
    
        } catch (err) {
            errorResponse(res, err);
        }
    });
// take room id, compare it to all the rooms i have, then push it into messages array in the correct Room Collection

//GET ALL MESSAGES
router.get('/', async(req, res) => {
    try {

        const getAllMessages = await Message.find();
        
        getAllMessages ?
            res.status(200).json({
                getAllMessages
            }) :
            res.status(404).json({
                message: `No messages found`
            });

    } catch (err) {
        errorResponse(res, err);
    }
});

//UPDATE MESSAGE
router.patch('/:id', validateSession, async(req, res) => {
    try{

        const { id } = req.params;

        const filter = { _id: id, owner_id: req.user._id, room_id: req.room._id}

        const info = req.body;
        
        const returnOption = {new: true};

        const updated = await Message.findOneAndUpdate(filter, info, returnOption);

        res.status(200).json({
            message: `${updated.date} Updated!`,
            updated
        })

    } catch (err) {
        errorResponse(res, err);
    }
})

//DELETE MESSAGE
router.delete('/:id/:room_id', validateSession, async(req, res) => {
    try {
        const { id, room_id } = req.params;

        const deleteMessage = await Message.deleteOne({_id: id, owner_id: req.user._id, room_id: req.room._id});

        deleteMessage.deletedCount ?
            res.status(200).json({
                message: 'Message removed!'
            }) :
            res.status(404).json({
                message: "No messages here!"
            })
        
    } catch (err) {
        errorResponse(res, err);
    }
});
module.exports = router;

// string push
// string push, garage lesson