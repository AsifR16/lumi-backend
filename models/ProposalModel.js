const ParentModel = require("./ParentModel");

class ProposalModel extends ParentModel{
    constructor(){
        super("proposals");
    }
    getUnderReviewProposal(gigId){
        const sql = `SELECT * FROM gigs WHERE gigId:? AND status="review"`;
        const stmt = this.db.prepare(sql);
        stmt.all([gigId],(err,rows)=>{
            if(err){
                console.error(err.message);
                return -1;
            }else{
                if(rows.length===0){
                    return 0;
                }else{
                    return rows;
                }
            }
        });
        stmt.finalize();
    }
    getAllAcceptedProposal(gigId){
        const sql = "SELECT * FROM proposals WHERE gigId=? AND status='accepted'";
        const stmt = this.db.prepare(sql);
        stmt.all([gigId],(err,rows)=>{
            if(err){
                console.error(err.message);
                return -1;
            }else{
                if(rows.length===0){
                    return 0;
                }else{
                    return rows;
                }
            }
        });
        stmt.finalize();
    }
}

module.exports = ProposalModel;