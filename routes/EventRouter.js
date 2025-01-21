const express = require("express");
const {generateUserId} = require("../utils/generator");
const EventModel = require("../models/EventModel");

const router = express.Router();
const events = new EventModel();

router.post("/create-event",(req,res)=>{
    const {eventTitle, description,date, time,duration,platform,eventType,maxAttendee,url} = req.body;
    const sessionData = req.sessionData;

    const option = {
        eventId:generateUserId(),
        userId:sessionData["userId"],
        college:sessionData["college"],
        eventTitle:eventTitle,
        description:description,
        date:date,
        time:time,
        duration:duration,
        platform:platform,
        eventType:eventType,
        maxAttendee:maxAttendee,
        url:url
    };
    const val = events.add(option);

    if(val!=-1){
        res.status(200).json({errorCode:0,eventDetails:option}); // success
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/live-events",(res,req)=>{
    const {userDateTime} = req.body;
    const sessionData = req.sessionData;
    const rows = events.getLiveEvents(userDateTime);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no live events
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/all-events-by-college",(req,res)=>{
    const college = req.sessionData["college"];
    const rows = events.getAllEventsByCollege(college);
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no evcents in college
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

router.get("/get-all-events",(req,res)=>{
    const rows = events.getAllEvents();
    if(rows!=-1){
        if(rows!=0){
            res.status(200).json({errorCode:0,data:rows}); // success
        }else{
            res.status(200).json({errorCode:200}); // no evcents at all
        }
    }else{
        res.status(404).json({errorCode:500}); // database error
    }
});

module.exports = router;