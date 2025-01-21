const ParentModel = require("./ParentModel");

class EventModel extends ParentModel{
    constructor(){
        super("events");
    }

    getLiveEvents(userDateTime){
        const sql = "SELECT * FROM your_table WHERE datetime(?) BETWEEN datetime(date || ' ' || time) AND datetime(date || ' ' || time, '+' || duration || ' minutes')";
        const stmt = this.db.prepare(sql);
        stmt.all([userDateTime],(err,rows)=>{
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

    getAllEventsByCollege(college){
        const sql = "SELECT * FROM events WHERE college=?";
        const stmt = this.db.prepare(sql);
        stmt.all([college],(err,rows)=>{
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

    getAllEvents(){
        const sql = "SELECT * FROM events";
        this.db.all(sql,(err,rows)=>{
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
    }
}

module.exports = EventModel;