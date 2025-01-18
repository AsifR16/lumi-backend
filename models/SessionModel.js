const ParentModel = require("./ParentModel");

class SessionModel extends ParentModel{
    constructor(){
        super("sessions");
    }
}

module.exports = SessionModel;