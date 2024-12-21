const express = require('express');
const Skills = require('../Models/Skills');


const SkillUpdate = async (req, res) => {

    try {

        ///    console.log(req.body);
        const skillsposs = await Skills.findOne({ USERID: req.id });

        // console.log(skillsposs);

        if (skillsposs) {

            skillsposs.selectedSkills = req.body;
            await skillsposs.save();

            res.status(200).send({
                success: true,
                message: 'SucessFully Updated'
            })

        }
        else {

            // new model banega bhai isme 


            const p = new Skills({
                selectedSkills: req.body,
                USERID: req.id
            })

            //    console.log(p);

            await p.save();

            res.status(200).send({
                success: true,
                message: 'SucessFully Updates'
            })

        }

    }

    catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

}


const SkillsFetcher = async (req, res) => {

    try {


        let skillspos = await Skills.findOne({ USERID: req.id });   // all skills of this user 
        const arr = [];

        if (skillspos) {
            return res.status(200).send(skillspos.selectedSkills);
        }

        else {
            return res.status(200).send(arr);
        }


    }

    catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

}


// for fetching using a user/"id"

const SkillsFetcherByID = async (req, res) => {

    try {

        let userid = req.params.USERID;

        console.log(userid);

        let skillspos = await Skills.findOne({ USERID: userid });   // all skills of this user 
        const arr = [];

        console.log(skillspos);

        if (skillspos) {
            return res.status(200).send(skillspos.selectedSkills);
        }

        else {
            return res.status(200).send(arr);
        }


    }

    catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

}



const FetchMatchedSkills = async (req, res) => {

    try {
        const skills = req.body;   // req.body  is a skill array 


        console.log(skills);

        // Find users whose skills array contains all the elements of the provided skills array
        let users = await Skills.find({
            'selectedSkills.name': { $all: skills }
        });
        // operator function 

        //  console.log(req.body);

        console.log(users);
        console.log(req.id);

        let profile = users.filter((e) => {
            return (e.USERID).toString() !== req.id;
        })

        // // 'selectedSkill.name :{$all:skills}
        users = profile;

        /// console.log(users);
        res.json({ success: true, users });
    } catch (error) {
        //  console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }

}


module.exports = { SkillUpdate, SkillsFetcher, FetchMatchedSkills, SkillsFetcherByID };