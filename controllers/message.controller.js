const router = require('express').Router();
const { Message, Room } = require('../models/index');
const { success, error, incomplete } = require('../helpers');
const validateSession = require('../middleware/validate-session');

//CREATE A MESSAGE
router.post('/', validateSession, async (req,res) => {
    try {
            const { date , text, room_id } = req.body;

            const message = new Message({
                date, text, owner_id: req.user.id, room_id
            });
    
            const newMessage = await message.save();

            const forRoom = {
                date: newMessage.date,
                text: newMessage.text,
                id: newMessage.room_id
            }

            // Attach the message to the corresponding room
            await Room.findOneAndUpdate(
                {_id: room_id}, {$push: {messages: forRoom}}
            );
            //Response to User whether successful or unsuccessful 
            newMessage ? success(res, newMessage) : incomplete(res);

            res.status(200).json({
                newMessage,
                message: `${newMessage.date} new message in your inbox!`
            });
    
        } catch (err) {
            error(res, err);
        }
    });

//GET ALL MESSAGES PER ROOM
router.get('/:id', async(req, res) => {
    try {

        const getAllMessages = await Message.find({room_id: id});
        
        getAllMessages ?
            res.status(200).json({
                getAllMessages
            }) :
            res.status(404).json({
                message: `No messages found`
            });

    } catch (err) {
        error(res, err);
    }
});


//UPDATE MESSAGE
router.patch('/:id', validateSession, async(req, res) => {
    try{

        const { id } = req.params;

        const filter = { _id: id, owner_id: req.user._id }

        const info = req.body;
        
        const returnOption = {new: true};

        const updated = await Message.findOneAndUpdate(filter, info, returnOption);

        res.status(200).json({
            message: `${updated.date} Updated!`,
            updated
        })

    } catch (err) {
        error(res, err);
    }
})

//DELETE MESSAGE
router.delete('/:id', validateSession, async(req, res) => {
    try {
        const { id } = req.params;

        const deleteMessage = await Message.deleteOne({_id: id, owner_id: req.user._id});

        deleteMessage.deletedCount ?
            res.status(200).json({
                message: 'Message removed!'
            }) :
            res.status(404).json({
                message: "No messages here!"
            })
        
    } catch (err) {
        error(res, err);
    }
});
module.exports = router;
