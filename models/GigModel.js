const ParentModel = require("./ParentModel");

class GigModel extends ParentModel{
    constructor(){
        super("gigs");
    }

    getAllGigs(){
        const sql = "SELECT * from gigs WHERE freelancerFound=0";
        this.db.all(sql,(err,rows)=>{
            if(err){
                console.error(err.message);
                return -1;
            }else{
                if(rows.length === 0){
                    return rows;
                }else{
                    return 0;
                }
            }
        });
    }

    getAllGigsByCollege(college){
        const sql = `SELECT * FROM gigs WHERE college=? AND freelancerFound=0`;
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
    getAllGigsBySkills(skills){
        const allGigs = this.getAllGigs();
        const skillsGigs=[];
        if(allGigs.length != -1){
            if(allGigs.length != 0){
                for (let index = 0; index < allGigs.length; index++) {
                    const element = allGigs[index];
                    const containsItem = skills.some(item => element["skills"].includes(item));
                    if(containsItem){
                        skillsGigs.push(element);
                    }
                }
                return skillsGigs;
            }else{
                return 0;
            }
        }else{
            return -1;
        }
    }

    getAllGigsByCollegeAndSkills(college,skills){
        const allGigs = this.getAllGigsByCollege(college);
        const skillsGigs=[];
        if(allGigs.length != -1){
            if(allGigs.length != 0){
                for (let index = 0; index < allGigs.length; index++) {
                    const element = allGigs[index];
                    const containsItem = skills.some(item => element["skills"].includes(item));
                    if(containsItem){
                        skillsGigs.push(element);
                    }
                }
                return skillsGigs;
            }else{
                return 0;
            }
        }else{
            return -1;
        }
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
}