const ParentModel = require("./ParentModel");

class StudentModel extends ParentModel{
    constructor(){
        super("students");
    }
}

module.exports = StudentModel;