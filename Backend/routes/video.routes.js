const express = require('express');
const {body, validationResult} = require('express-validator');
const videoModel = require('../models/video.models');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.get("/",async (req,res)=>{
    
    const videos = await videoModel.find({});

    return res.status(200).json({
        videos: videos
    });

});

router.get("/:id",async (req,res)=>{
    
    const videos = await videoModel.findOne({_id: req.params.id});
    console.log("videos",videos);
    return res.status(200).json({
        videos: videos
    });

});

router.post("/create",async (req,res)=>{
    

    console.log(req.body);

    const video = await videoModel.create({
        videoname: req.body.videoname,
        videolink: req.body.videolink,
        websitelink: req.body.websitelink,
        githublink: req.body.githublink
    });

    return res.status(200).json({video: video});

});




router.post("/update",async (req,res)=>{

    console.log(req.body);

    const video = await videoModel.updateOne({_id: req.body._id},
    {
        $set: {
        videoname: req.body.videoname,
        videolink: req.body.videolink,
        websitelink: req.body.websitelink,
        githublink: req.body.githublink
        }
    });

    return res.status(200).json({video: video});

});


router.delete("/delete/:id",async (req,res)=>{
    try {
        console.log(req.params);

        const result = await videoModel.deleteOne({_id: req.params.id});

        if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Video not found" });
        }

            return res.status(200).json({ message: "Video deleted successfully", result });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error : error });
        }
    return res.status(200).json({video: video});

});

module.exports = router;
