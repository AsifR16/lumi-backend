const express = require("express");
const CampaignModel = require("../models/CampaignModel");
const { generateUserId } = require("../utils/generator");

const router = express.Router();
const campaign = new CampaignModel();

router.post("/create-campaign",(req,res)=>{
    const {title,description,fundraisingGoal,endDate,imageUrl,donateUrl} = req.body;
    const option = {
        id:generateUserId(),
        userId:req.sessionData["userId"],
        college:req.sessionData["college"],
        title:title,
        description:description,
        fundraisingGoal:fundraisingGoal,
        endDate:endDate,
        imageUrl:imageUrl,
        donateUrl:donateUrl,
        status:"opened"
    };
    const val = campaign.add(option);
    if(val!=-1){
        res.status(200).json({errorCode:0,campaignDetails:option}); // success
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/all-campaigns-by-college",(req,res)=>{
    const {college} = req.body;
    const rows = campaign.getCampaignsByCollege(college);
    if(rows!=-1){
        if(rows!=0){
            res.send(200).json({errorCode:0,data:rows}); // success
        }else{
            res.send(200).json({errorCode:200}) // no campaigns by college
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/all-campaigns",(req,res)=>{
    const rows = campaign.getAllCampaigns();
    if(rows!=-1){
        if(rows!=0){
            res.send(200).json({errorCode:0,data:rows}); // success
        }else{
            res.send(200).json({errorCode:200}) // no campaigns at all
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.post("/close-campaign",(res,req)=>{
    const {userId,campaignId} = req.body;
    if(userId==(campaign.searchBy({id:campaignId})["userId"])){
        const update = campaign.update({id:campaignId,status:"closed"});
        res.send(200).json({errorCode:0}) // success
    }else{
        res.status(404).json({errorCode:700}) // not allowed
    }
});

module.exports = router;