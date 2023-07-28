const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT

router.post('/signup', async (req, res) => {

    try {
        
        const user = new User({
            username: req.body.user,
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({email: email});
        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log(passwordMatch);
        if(!user || !passwordMatch) throw new Error('Email or Password does not match');
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            message: `Success!`,
            user,
            token
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})



module.exports = router;