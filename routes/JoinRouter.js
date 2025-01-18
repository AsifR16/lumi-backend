const express = require("express");
const bcrypt = require("bcrypt");
const isValidEmail = require("../utils/validator");
const StudentModel = require("../models/StudentModel");
const { generateSessionId, generateUserId } = require("../utils/generator");
const AlumniModel = require("../models/AlumniModel");
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
    const saltRounds = 10;
    const {name,email,password,major,gradyear,college} = req.body;
    const len = password.length;
    if(isValidEmail(email) && len>=6 && len<=6){
        let option = {
            id:generateUserId(),
            name:name,
            email:email,
            password:await bcrypt.hash(password, saltRounds),
            major:major,
            gradyear:gradyear,
            college:college
        }
        const userId = student.add(option);
        if(userId!=-1){
            const session_options = {
                sessionId:generateSessionId(),
                userId:userId,
                role:"student",
                college:college
            };
            const sessionModelId = session.add(session_options);
            if(sessionModelId){
                res.status(200).json({errorCode:0,sessionId:session_options.sessionId}); // success
            }else{
                res.status(404).json({errorCode:600}); // session error
            }
        }else{
            res.status(404).json({errorCode:400}); // user already exists
        }
    }else{
        res.status(404).json({errorCode:300}); //invalid data
    }
});

router.post("/alumni",async (req,res)=>{
    const saltRounds = 10;
    const {name,email,password,major,gradyear,college,company,jobtitle} = req.body;
    const len = password.length;
    if(isValidEmail(email) && len>=6 && len<=6){
        let option = {
            id:generateUserId(),
            name:name,
            email:email,
            password:await bcrypt.hash(password,saltRounds),
            major:major,
            gradyear:gradyear,
            college:college,
            company:company,
            jobtitle:jobtitle
        }
        const userId = alumni.add(option);
        if(userId!=-1){
            const session_options = {
                sessionId:generateSessionId(),
                userId:userId,
                role:"alumni",
                college:college
            };
            const sessionModelId = session.add(session_options);
            if(sessionModelId){
                res.status(200).json({errorCode:0,sessionId:session_options.sessionId}); // success
            }else{
                res.status(404).json({errorCode:600}); // session error
            }
        }else{
            res.status(404).json({errorCode:400}); // user already exists
        }
    }else{
        res.status(404).json({errorCode:300}); //invalid data
    }
});

router.post("/recruiter",async (req,res)=>{
    const saltRounds = 10;
    const {name,email,password,company,jobtitle} = req.body;
    const len = password.length;
    if(isValidEmail(email) && len>=6 && len<=6){
        let option = {
            id:generateUserId(),
            name:name,
            email:email,
            password:await bcrypt.hash(password,saltRounds),
            company:company,
            jobtitle:jobtitle
        };
        const userId = recruiter.add(option);
        if(userId!=-1){
            const session_options = {
                sessionId:generateSessionId(),
                userId:userId,
                role:"recruiter",
                college:"null"
            };
            const sessionModelId = session.add(session_options);
            if(sessionModelId){
                res.status(200).json({errorCode:0,sessionId:session_options.sessionId}); // success
            }else{
                res.status(404).json({errorCode:600}); // session error
            }
        }else{
            res.status(404).json({errorCode:400}); // user already exists
        }
    }else{
        res.status(404).json({errorCode:300}); //invalid data
    }
});

router.post("/faculty",async (req,res)=>{
    const saltRounds = 10;
    const {name,email,password,title,department,college} = req.body;
    const len = password.length;
    if(isValidEmail(email) && len>=6 && len<=6){
        let option = {
            id:generateUserId(),
            name:name,
            email:email,
            password:await bcrypt.hash(password,saltRounds),
            title:title,
            department:department,
            college:college
        };
        const userId = faculty.add(option);
        if(userId!=-1){
            const session_options = {
                sessionId:generateSessionId(),
                userId:userId,
                role:"faculty",
                college:college
            };
            const sessionModelId = session.add(session_options);
            if(sessionModelId){
                res.status(200).json({errorCode:0,sessionId:session_options.sessionId}); // success
            }else{
                res.status(404).json({errorCode:600}); // session error
            }
        }else{
            res.status(404).json({errorCode:400}); // user already exists
        }
    }else{
        res.status(404).json({errorCode:300}); //invalid data
    }
});

module.exports = router;