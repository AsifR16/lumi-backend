const ParentModel = require("./ParentModel");

class ProposalModel extends ParentModel{
    constructor(){
        super("proposals");
    }
}

module.exports = ProposalModel;