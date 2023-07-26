const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT

//ticket 4 accidently started earlier:
router.post('/signup', async (req, res) => {

    try {
        
        const user = new User({
            userName: req.body.user,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)
        });

        const newUser = await user.save();
            const token = jwt.sign({message: "Hello"}, "My Secret Message", {expiresIn: "1 day"});

        res.status(200).json({
            user: newUser,
            message: 'Success!',
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}); 

module.exports = router;