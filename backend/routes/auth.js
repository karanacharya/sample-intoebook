const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const user = User;
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "karanisagoodboyandheisverysmarttoo"


//  ROUTE: 1 Create a User using: POST "api/auth/createuser".Doesn't require Auth
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],
    async (req, res) => {
        // If there are errors return the bad status request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }


        //Check weather the user with the same email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let success =  false;
            return res.status(400).json({ success, error: "Sorry this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })



        // creating a TokenExpiredError,
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        //post json in response
        success= true;
        res.json({ success, authtoken });

    }),



    //ROUTE :2 Authenticate a user 
    router.post('/login', [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'password cannot be empty').exists(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let success = false
            return res.status(400).json({ success,errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success=false
                return res.status(400).json({ success,error: "please try to login with correct login credentials" });
            }
            const passwordcompare = await bcrypt.compare(password, user.password);
            if (!passwordcompare) {
                 success=false
                return res.status(400).json({ success, error: "please try to login with correct login credentials" });
            }

            // creating a Token,
            const payload = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(payload, JWT_SECRET);
            success= true
            res.json({ success,authtoken });


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occured");
        }
    });


//ROUTE : 3 Get logged in user details using :POST "/api/auth/getuser".Login required.

router.post('/getuser', fetchuser,async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");  //.select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured");
    }
})




module.exports = router



