const express = require('express');
const Profile = require('../Models/Profile');
const fs = require('fs');

const ProfileUpdate = async (req, res) => {

    try {



        let { name, COLLEGENAME, USERID, YEAROFGRADUATION, LINKEDINID, PORTFOLIOLINK } = req.fields;
        let { photo } = req.files;


        const profile = await Profile.findOne({ USERID: USERID });

        //   console.log(profile);

        if (profile) {

            profile.name = name;
            profile.COLLEGENAME = COLLEGENAME;
            profile.YEAROFGRADUATION = YEAROFGRADUATION;
            profile.LINKEDINID = LINKEDINID;
            profile.PORTFOLIOLINK = PORTFOLIOLINK;

            if (photo) {
                profile.photo.data = fs.readFileSync(photo.path);
                profile.photo.contentType = photo.type;
            }

            await profile.save();

            //  console.log(profile);

            return res.status(200).send({
                success: true,
                message: 'Updated SuccessFully',
                profile
            });

        }

        else {


            const newProfile = new Profile({

                name,
                COLLEGENAME,
                USERID,
                YEAROFGRADUATION,
                LINKEDINID,
                PORTFOLIOLINK,

            })

            if (photo) {
                newProfile.photo.data = fs.readFileSync(photo.path);
                newProfile.photo.contentType = photo.type;
            }


            await newProfile.save();

            res.status(200).send({
                success: true,
                message: 'Updated SucessFully',
                newProfile
            });

        }

    } catch (error) {
        //       console.log(error.message);
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

    // console.log(profile);

    // profile.name = name;
    // profile.USERID = USERID;
    // profile.COLLEGENAME = COLLEGENAME;
    // profile.YEAROFGRADUATION = YEAROFGRADUATION;
    // profile.LINKEDINID = LINKEDINID;
    // profile.PORTFOLIOLINK = PORTFOLIOLINK;
    // profile.SELECTINTERESTS = SELECTINTERESTS;

    // console.log(profile);

    // if (photo) {

    //     profile.photo.data = fs.readFileSync(photo.path);
    //     profile.photo.contentType = photo.type;
    // }

    // await profile.save();

    // console.log(profile);

    // res.status(200).send({
    //     success: true,
    //     message: 'Profile updated successfully',
    //     updatedproduct: profile
    // });


    //     // if (profile) {
    //     //   let idofprofile = profile._id;
    //     //   profile = await Profile.findByIdAndDelete(idofprofile);
    //     // }

    //     // let c = {
    //     //   ...req.body,
    //     //   USERID: req.id,
    //     // };

    //     // if (req.body.PROFILELINK.length == 0) {
    //     //   c = {
    //     //     ...req.body,
    //     //     USERID: req.id,
    //     //     PROFILELINK: "https://i.pinimg.com/originals/f5/c2/33/f5c233abe166b186b989293ad18ba07a.jpg",
    //     //   };
    //     // }

    //     // console.log(c);

    //     // profile = await Profile.create(c); // user id bhi frontend se aayegi

    //     // res.status(200).json(profile);

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         sucess: false,
    //         message: errorMonitor.message
    //     })
    // }

}



const ProfilePhoto = async (req, res) => {

    try {

        const userid = req.params.USERID;
        //  console.log(userid);
        // userid hai profile 


        const profileByID = await Profile.findOne({ USERID: userid }).select("photo");
        // console.log(profileByID);

        if (profileByID.photo.data) {

            res.set('Content-type', profileByID.photo.contentType);
            return res.status(200).send(
                profileByID.photo.data
            )

        }
        else {

            return res.status(200);
        }

    }
    catch (error) {

        res.status(500).send({
            success: false,
            error,
        })

    }
}





module.exports = { ProfileUpdate, ProfilePhoto };

