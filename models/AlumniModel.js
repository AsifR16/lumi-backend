const ParentModel = require("./ParentModel");

class AlumniModel extends ParentModel{
    constructor(){
        super("alumnis");
    }
}

module.exports = AlumniModel;