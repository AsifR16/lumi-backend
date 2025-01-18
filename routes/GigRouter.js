const express = require("express");
const { generateUserId } = require("../utils/generator");
const GigModel = require("../models/GigModel");
const SessionModel = require("../models/SessionModel");
const ProposalModel = require("../models/ProposalModel");
const AcceptedProposalModel = require("../models/AcceptedProposalModel");

const router = express.Router();
const session = new SessionModel();
const gig = new GigModel();
const proposal = new ProposalModel();
const acceptedProposal = new AcceptedProposalModel();

router.post("/create-gig",(req,res)=>{
    const {title,description,budget,duration,skills} = req.body;
    const session_data = req.sessionData;
    const option = {
        id:generateUserId(),
        userId:session_data['userId'],
        college:session_data['college'],
        role:session_data['role'],
        title:title,
        description:description,
        budget:budget,
        duration:duration,
        skills:skills
    };
    const gigId = gig.add(option);
    if(gigId!=-1){
        res.status(200).json({errorCode:0,gigId:gigId,gigDetails:option});
    }else{
        res.status(404).json({errorCode:300}); // invalid data
    }
});

router.get("/gigs-by-college",(req,res)=>{
    const sessionData = req.sessionData;
    const {college} = req.body;
    const rows = gig.getAllGigsByCollege(college);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,sessionId:sessionData["sessionId"],data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no gigs
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/all-gigs",(req,res)=>{
    const sessionData = req.sessionData;
    const rows = gig.getAllGigs();
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,sessionId:sessionData["sessionId"],data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no gigs
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/all-gigs-by-skills",(req,res)=>{
    const {skills} = req.body;
    const sessionData = req.sessionData;
    const rows = gig.getAllGigsBySkills(skills);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,sessionId:sessionData["sessionId"],data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no gigs
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/all-gigs-by-skills-college",(req,res)=>{
    const {skills,college} = req.body;
    const sessionData = req.sessionData;
    const rows = gig.getAllGigsByCollegeAndSkills(college,skills);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,sessionId:sessionData["sessionId"],data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no gigs
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.post("/apply-now",(req,res)=>{
    const sessionData = req.sessionData;
    const {proposal,gigId} = req.body;
    const option = {
        gigId:gigId,
        userId:sessionData["userId"],
        role:sessionData["role"],
        college:sessionData["college"],
        proposal:proposal
    };
    const val = proposal.add(option);
    if(val!=-1){
        res.status(200).json({errorCode:0}) // success
    }else{
        res.status(404).json({errorCode:500}) // database error
    }
});

router.get("/all-proposals",(req,res)=>{
    const sessionData = req.sessionData;
    const {gigId} = req.body;

    const rows = proposal.searchBy({gigId:gigId});
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:100}); // no proposals found
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/accept-proposal",(req,res)=>{
    const sessionData = req.sessionData;
    const {gigId} = req.body;
    const options = {
        proposalBy:proposal.searchBy({gigId:gigId})["userId"],
        proposalTo:sessionData["userId"],
        gigId:gigId
    };
    const val = acceptedProposal.add(options);
    if(val!=-1){
        res.status(200).json({errorCode:0}); // success
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

module.exports = router;