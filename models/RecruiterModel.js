const ParentModel = require("./ParentModel");

class RecruiterModel extends ParentModel{
    constructor(){
        super("recruiters");
    }
}

module.exports = RecruiterModel;