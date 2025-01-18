const crypto = require("crypto");

function generateUserId(){
    const userid = crypto.randomBytes(8).toString("hex");
    return userid;
}

function generateSessionId(){
    const sessionid = crypto.randomUUID();
    return sessionid;
}

module.exports = {generateSessionId,generateUserId};