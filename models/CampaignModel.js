const ParentModel = require("./ParentModel");

class CampaignModel extends ParentModel{
    constructor(){
        super("campaigns");
    }
    getCampaignsByCollege(college){
        const sql = "SELECT * FROM campaigns WHERE college=? AND status='opened'";
        const stmt = this.db.prepare(sql);
        stmt.all([college],(err,rows)=>{
            if(err){
                console.error(err.message);
                return -1;
            }else{
                if(rows.length === 0){
                    return 0;
                }else{
                    return rows;
                }
            }
        });
        stmt.finalize();
    }
    getAllCampaigns(){
        const sql = "SELECT * FROM campaigns WHERE status='opened'";
        this.db.all(sql,(err,rows)=>{
            if(err){
                console.error(err.message);
                return -1;
            }else{
                if(rows.length === 0){
                    return 0;
                }else{
                    return rows;
                }
            }
        });
    }
}

module.exports = CampaignModel;