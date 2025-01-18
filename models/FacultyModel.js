const ParentModel = require("./ParentModel");

class FacultyModel extends ParentModel{
    constructor(){
        super("faculties");
    }
}

module.exports = FacultyModel;