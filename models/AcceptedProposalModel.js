const ParentModel = require("./ParentModel");

class AcceptedProposalModel extends ParentModel{
    constructor(){
        super("acceptedproposals");
    }
}

module.exports = AcceptedProposalModel;