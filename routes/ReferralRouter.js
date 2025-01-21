const express = require('express');
const ReferralModel = require("../models/ReferralModel");
const { generateUserId } = require('../utils/generator');

const router = express.Router();
const referral = new ReferralModel();

router.post("/create-job",(req,res)=>{
    const {title,company,location,experience,type,skills,description,qualifications,deadline} = req.body;
    const option = {
        id:generateUserId(),
        userId:req.sessionData["userId"],
        title:title,
        company:company,
        location:location,
        experience:experience,
        type:type,
        skills:skills,
        description:description,
        qualifications:qualifications,
        deadline:deadline,
        status:"opened"
    };
    const val = referral.add(option);
    if(val!=-1){
        res.status(200).json({errorCode:0,jobDetail:option}); // success
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/get-all-jobs",(req,res)=>{
    const rows = referral.getAllJobs();
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no jobs at all
        }
    }else{
        res.status(404).json({errorCode:500}) // database error
    }
});

router.get("/get-jobs-by-ex",(req,res)=>{
    const {experience} = req.body;
    const rows = referral.getAllJobsByEx(experience);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no jobs with experience at all
        }
    }else{
        res.status(404).json({errorCode:500}) // database error
    }
});

router.get("/get-jobs-by-location",(req,res)=>{
    const {location} = req.body;
    const rows = referral.getAllJobsByLocation(location);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no jobs at all
        }
    }else{
        res.status(404).json({errorCode:500}) // database error
    }
});

router.post("/delete-jobs",(req,res)=>{
    const {jobId} = req.body;
    const update = referral.update({id:jobId,status:"closed"});
    res.status(200).json({errorCode:0}); // success
});

router.get("/get-jobs-by-userid",(req,res)=>{
    const rows = referral.getAllJobsByUserId(req.sessionData["userId"]);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no jobs by userid
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

module.exports = router;