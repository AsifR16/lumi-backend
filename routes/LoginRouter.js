const express = require("express");
const bcrypt = require("bcrypt");
const StudentModel = require("../models/StudentModel");
const AlumniModel = require("../models/AlumniModel");
const isValidEmail = require("../utils/validator");
const generator = require("../utils/generator");
const RecruiterModel = require("../models/RecruiterModel");
const FacultyModel = require("../models/FacultyModel");
const SessionModel = require("../models/SessionModel");

const router = express.Router();
const student = new StudentModel();
const alumni = new AlumniModel();
const recruiter = new RecruiterModel();
const faculty = new FacultyModel();
const session = new SessionModel();

router.post("/student",async (req,res)=>{
    const {email,password} = req.body;
    const len = password.length;

    if(isValidEmail(email) && len>=6 && len<=12){
        const row = student.searchBy({email:email});
        if(row!=0 && row!=-1){
            if(await bcrypt.compare(password,row["password"])){
                const sessionId = generator.generateSessionId();
                const session_options = {
                    sessionId:sessionId,
                    userId:row["id"],
                    role:"student",
                    college:row["college"]
                };
                const sessionModelId = session.searchBy(session_options);
                if(sessionModelId){
                    res.status(200).json({errorCode:0,sessionId:sessionId}); // success
                }else{
                    res.status(404).json({errorCode:600}) // session error
                }
            }else{
                res.status(404).json({errorCode:100}); // password incorrect
            }
        }else{
            res.status(404).json({errorCode:200}) // user does not exists
        }
    }else{
        res.status(404).json({errorCode:300}) // invalid data
    }
});

router.post("/alumni",async (req,res)=>{
    const {email,password} = req.body;
    const len = password.length;

    if(isValidEmail(email) && len>=6 && len<=12){
        const row = alumni.searchBy({email:email});
        if(row!=0 && row!=-1){
            if(await bcrypt.compare(password,row["password"])){
                const sessionId = generator.generateSessionId();
                const session_options = {
                    sessionId:sessionId,
                    userId:row["id"],
                    role:"alumni",
                    college:row["college"]
                };
                const sessionModelId = session.searchBy(session_options);
                if(sessionModelId){
                    res.status(200).json({errorCode:0,sessionId:sessionId}); // success
                }else{
                    res.status(404).json({errorCode:600}) // session error
                }
            }else{
                res.status(404).json({errorCode:100}); // password incorrect
            }
        }else{
            res.status(404).json({errorCode:200}) // user does not exists
        }
    }else{
        res.status(404).json({errorCode:300}) // invalid data
    }
});

router.post("/recruiter",async (req,res)=>{
    const {email,password} = req.body;
    const len = password.length;

    if(isValidEmail(email) && len>=6 && len<=12){
        const row = recruiter.searchBy({email:email});
        if(row!=0 && row!=-1){
            if(await bcrypt.compare(password,row["password"])){
                const sessionId = generator.generateSessionId();
                const session_options = {
                    sessionId:sessionId,
                    userId:row["id"],
                    role:"recruiter",
                    college:null
                };
                const sessionModelId = session.searchBy(session_options);
                if(sessionModelId){
                    res.status(200).json({errorCode:0,sessionId:sessionId}); // success
                }else{
                    res.status(404).json({errorCode:600}) // session error
                }
            }else{
                res.status(404).json({errorCode:100}); // password incorrect
            }
        }else{
            res.status(404).json({errorCode:200}) // user does not exists
        }
    }else{
        res.status(404).json({errorCode:300}) // invalid data
    }
});

router.post("/faculty",async (req,res)=>{
    const {email,password} = req.body;
    const len = password.length;

    if(isValidEmail(email) && len>=6 && len<=12){
        const row = faculty.searchBy({email:email});
        if(row!=0 && row!=-1){
            if(await bcrypt.compare(password,row["password"])){
                const sessionId = generator.generateSessionId();
                const session_options = {
                    sessionId:sessionId,
                    userId:row["id"],
                    role:"faculty",
                    college:row["college"]
                };
                const sessionModelId = session.searchBy(session_options);
                if(sessionModelId){
                    res.status(200).json({errorCode:0,sessionId:sessionId}); // success
                }else{
                    res.status(404).json({errorCode:600}) // session error
                }
            }else{
                res.status(404).json({errorCode:100}); // password incorrect
            }
        }else{
            res.status(404).json({errorCode:200}) // user does not exists
        }
    }else{
        res.status(404).json({errorCode:300}) // invalid data
    }
});

module.exports = router;