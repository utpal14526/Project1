const express = require("express");
const router = express.Router();
const fetchuser = require('../Middleware/fetchuser')
const Messages = require('../Models/Messages');


router.get('/new-messages', fetchuser, async (req, res) => {

    try {

        const newmessages = await Messages.findOne({ USERID: req.id }).select("-seenmessages");

        if (!newmessages) {
            newmessages = [];
        }
        res.status(200).send({
            success: true,
            newmessages: newmessages.newmessages
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

})


router.get('/getCount', fetchuser, async (req, res) => {

    try {

        const newmessages = await Messages.findOne({ USERID: req.id }).select("-seenmessages");

        if (!newmessages) {
            newmessages = [];
        }

        const len = (newmessages.newmessages.length);


        res.status(200).send({
            length: len
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

})


router.get('/seen-messages', fetchuser, async (req, res) => {

    try {

        const seenmessages = await Messages.findOne({ USERID: req.id }).select("-newmessages");
        if (!seenmessages) {
            seenmessages = [];
        }

        res.status(200).send({
            success: false,
            seenmessages: seenmessages.seenmessages
        })

    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

})


// for new messages 
router.post('/new-messages/:toid', fetchuser, async (req, res) => {

    try {

        const messages = await Messages.findOne({ USERID: req.params.toid });
        const { data } = req.body;

        if (messages) {

            messages.newmessages = [data, ...messages.newmessages];
            await messages.save();

            res.status(200).send({
                success: true,
                messages,
            })
        }

        else {

            const message = new Messages({
                USERID: req.params.toid,
                seenmessages: [],
                newmessages: [data],
            })

            await message.save();
            res.status(200).send({
                success: true,
                message,
            })

        }

    }

    catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
})


// for reading all messages 


router.get('/markread', fetchuser, async (req, res) => {

    try {

        const messages = await Messages.findOne({ USERID: req.id });


        if (messages) {

            const data = messages.newmessages;
            messages.newmessages = [];
            messages.seenmessages = [...data, ...messages.seenmessages];

            await messages.save();

            res.status(200).send({
                success: true,
                messages,
            })
        }

        else {


            res.status(200).send({
                success: true,
            })

        }

    }

    catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }

})




module.exports = router;