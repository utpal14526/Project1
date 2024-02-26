const express = require("express");
const router = express.Router();
const User = require("../Models/Usermodel");
const fetchuser = require("../Middleware/fetchuser");
const bcrypt = require ('bcrypt');
const { body, validationResult } = require('express-validator');

var jwt = require("jsonwebtoken");
var JWT_SECRET = "Utpalis@goodboy";

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "100d",
  });
};

// singup is working fine

router.post("/signup",

body('username','Length of Password should be atleast 3').isLength({ min: 3}),
body('email','Enter a valid email').isEmail(),
body('password','Length of Password should be atleast 5').isLength({ min: 5 }),

async (req, res) => {
  try {
    // no need for express-async -handler

     let s=true;

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         s=false;
          return res.status(400).json({s:s, Error:errors.array()[0].msg });
      }

    const { username, password, email, pic } = req.body;
   

    if (!username || !email || !password ) {
      s=false;
      return res.status(400).json({s:s, Error: "Please Enter all the fields " });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      s=false;
      return res.status(400).json({ s:s,Error: "User already exist " });
    } 

      const salt=await bcrypt.genSalt(10);
      const secpass=await bcrypt.hash(req.body.password,salt);

    user = await User.create({
      email: req.body.email,
      username: req.body.username,
      password:secpass,
      pic: req.body.pic,
    });

    //  console.log(user._id);
    console.log(user);

    res.json({
      s:s,
      authtoken: generateToken(user._id),
      id: user._id,
    });
  } catch (error) {
    s=false;
    res.status(400).json({s:s, Error: error });
  }
});

// login endpoint

router.post("/login", async (req, res) => {
  try {
    // no need for express-async -handler

    const { email, password } = req.body;
    let s = true;
    let user = await User.findOne({ email: req.body.email });

    

    const passwordCompare=await bcrypt.compare(password,user.password);
    

    if (user && passwordCompare) {
      return res.status(200).json({
        s: s,
        authtoken: generateToken(user._id),
        msg: `Welcome ${user.username}`,
        id: user._id,
      });
    } else {
      s = false;
      return res.status(400).json({ s: s, Error: "Enter Correct Credentials" });
    }
  } catch (error) {
    s = false;
    return res.status(400).json({ s: s, Error: "Something Went Wrong !!" });
  }
});

// auth usrer

router.post(
  "/fetchuser",
  fetchuser,

  async (req, res) => {
    try {
      const userId = req.id; // req.user.id mai aa jayega id
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      //try ends

      res.status(500).json({ error: " Internal Server error occured" });
    } //catch
  }
);

module.exports = router;
