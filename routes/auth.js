const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} =require('../validation');

router.post('/register',async (req,res) => {

    //lets validate before saving a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //checking if the user is already exista in db
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send('Email already exists');

    //Hasing passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch{
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login',async (req,res) => {
    //lets validate before login 
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    //checking if the user is already exista in db
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email or password is wrong');

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("Invalid password");
    
    //Create ans assign a token
    const token = jwt.sign({_id: user._id}, "jksfhmdnbvdfhsdggv");
    res.header('auth-token',token).send(token);
    //res.send("user logged in!");
});


module.exports = router;