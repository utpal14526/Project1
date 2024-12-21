const express = require('express');
const router = express.Router();
const Chat = require('../Models/Chatmodel')
const mongoose = require('mongoose');
const middleware = require('../Middleware/fetchuser')

router.post('/post-chat/:to', middleware, async (req, res) => {
    try {

        const content = req.body.content;
        const sender = req.id;
        const to = req.params.to;

        const Chats = new Chat({
            content: content,
            users: [sender, to],
            sender: sender,
            receiver: to,
        })

        await Chats.save();

        res.status(200).send({
            sucess: true,
            message: 'Send Success',
            Chats
        })

    }
    catch (error) {
        res.status(500).send({
            message: 'Send Unsuccess',
            sucess: false
        })
    }
})

// post the chat 

// fetch chat between two users


router.get('/fetch-chat/:to', middleware, async (req, res) => {
    try {


        const sender = req.id;
        const to = req.params.to;

        const Chats = await Chat.find({
            users: { $all: [new mongoose.Types.ObjectId(sender), new mongoose.Types.ObjectId(to)] }
        }).sort({ createdAt: 1 }).select("-users");

        res.status(200).send({
            sucess: true,
            message: 'Send Success',
            Chats
        })

    }
    catch (error) {
        res.status(500).send({
            message: error.message,
            sucess: false
        })
    }
})






module.exports = router;