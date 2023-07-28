const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateSession = async(req,res,next) => { 
        //* remember the timeLog() helper within the ToDo_List (Unit 5)
        try {
            const token = req.headers.authorization; 

            const decoded = await jwt.verify(token, process.env.JWT);
            // console.log(decoded);
            const user = await User.findById(decoded.id);
            req.user = user;

            return next(); 
            
        } catch (err) {
            res.json({message: err.message});
            }
    }
    
    module.exports = validateSession;