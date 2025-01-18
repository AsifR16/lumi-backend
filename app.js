const express = require("express");
const LoginRouter = require("./routes/LoginRouter");
const JoinRouter = require("./routes/JoinRouter");
const SessionModel = require("./models/SessionModel");
const EventRouter = require("./routes/EventRouter");
const GigRouter = require("./routes/GigRouter");

const app = express();
const session = new SessionModel();
const port = 3000 || process.env.port;

const protectedUrl = ["/home","/gig/create-gig","/gig/gigs-by-college","/gig/all-gigs","/gig//all-gigs-by-skills","/gig//all-gigs-by-skills-college"];

app.use(express.json())
app.use((req, res, next) => {
    if(protectedUrl.includes(req.url)){
        session_row = session.searchBy({sessionId:req.body["sessionId"]});
        if(session_row!=0 && session_row!=-1){
            req.sessionData = session_row;
            next();
        }else{
            res.status(404).json({errorCode:500,message:"No session ID",redirect:"Index Page"});
        }
    }else{
        next();
    }
});
app.use("/login/",LoginRouter);
app.use("/join/",JoinRouter);
app.use("/event/",EventRouter);
app.use("/gig/",GigRouter);

app.get("/home",(req,res)=>{
    res.send("Hello world");
});

app.listen(port);