const ParentModel = require("./ParentModel");

class ReferralModel extends ParentModel{
    constructor(){
        super("referrals");
    }
    getAllJobs(){
        const sql = "SELECT * FROM referrals";
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

    getAllJobsByEx(experience){
        const sql = "SELECT * FROM referrals WHERE experience=? AND status='opened'";
        const stmt = this.db.prepare(sql);
        stmt.all([experience],(err,rows)=>{
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

    getAllJobsByLocation(location){
            const sql = "SELECT * FROM referrals WHERE location=? AND status='opened'";
            const stmt = this.db.prepare(sql);
            stmt.all([location],(err,rows)=>{
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

    getAllJobsByUserId(userid){
        const sql = "SELECT * FROM referrals WHERE userId=? AND status='opened'";
        const stmt = this.db.prepare(sql);
        stmt.all([userid],(err,rows)=>{
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

module.exports = ReferralModel;