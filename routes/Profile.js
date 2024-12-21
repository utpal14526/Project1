const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");
const { ProfileUpdate, ProfilePhoto } = require("../Controllers/ProfileUpdate");
const formidable = require('express-formidable');


router.post('/profileupdate', fetchuser, formidable(), ProfileUpdate);
router.get('/profilephoto/:USERID', ProfilePhoto);

// req.id


module.exports = router;
