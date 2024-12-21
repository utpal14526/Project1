const express = require("express");
const router = express.Router();

const fetchuser = require("../Middleware/fetchuser");
const Friend = require("../Models/Friend");


router.post('/makefriend/:ofuserid', fetchuser, async (req, res) => {
  try {

    // make req.id and ofuserid a friend of each other

    const alreadyProfile = await Friend.find({
      $and: [
        { USERID: req.id },
        { of: req.params.ofuserid }
      ]
    });



    if (alreadyProfile.length > 0) {
      return res.status(200).send({
        sucess: true,
        message: 'You are already a Friend',
      })
    }

    const friends = new Friend({
      USERID: req.id,
      of: req.params.ofuserid
    })

    await friends.save();

    res.status(200).send({
      sucess: true,
      message: 'Added to friend List'
    })

  }
  catch (error) {
    res.status(500).send({
      sucess: false,
      message: 'Error while making Friend'
    })
  }
})


router.get('/fetchallfriends', fetchuser, async (req, res) => {
  try {



    // make req.id and ofuserid a friend of each other

    const allfriends = await Friend.find({ USERID: req.id }).populate("of");



    res.status(200).send({
      success: true,
      message: 'Fetch Friends success',
      allfriends
    })


  }
  catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error while Fteching Friend'
    })
  }
})


module.exports = router;
