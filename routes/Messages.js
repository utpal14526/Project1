const express = require("express");
const router = express.Router();
const Profile = require("../Models/Profile");
const fetchuser = require("../Middleware/fetchuser");

const Message = require("../Models/MessageModal");

router.post("/pushmessage", fetchuser, async (req, res) => {

  try {
    const newmessage = await Message.create({
      Sender: req.id,
      message: req.body.message,
      Chatusers: [req.id, req.body.Receiver],
    });

    res.status(200).send(newmessage);
  } catch (err) {
    res.status(400).json({ Error: "Something Went Wrong!!" });
  }
});

router.post("/getChats/:userid2", fetchuser, async (req, res) => {
  try {
    const from = req.id;
    const to = req.params.userid2;

    const newmessage = await Message.find({
      Chatusers: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const allmessages = newmessage.map((msg) => {
      return {
        myself: (msg.Sender.toString() == from) ? "YES" : "NO",
        message: msg.message,
      };
    });

    res.status(200).json(allmessages);
  } catch (err) {
    res.status(400).json({ Error: "Something Went Wrong!!" });
  }
});

module.exports = router;
