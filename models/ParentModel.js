const Database = require("./DatabaseModel");

class ParentModel{
    constructor(tablename){
        this.db = new Database();
        this.tablename = tablename;
    }

    close(){
        this.db.close();
    }

    add(options){
        const keyString = Object.keys(options).join(",");
        const valueString = new Array(Object.keys(options).length).fill('?').join(',');
    
        const sql = `INSERT INTO ${this.tablename}(${keyString}) VALUES (${valueString})`;
        let stmt = this.db.prepare(sql);
        stmt.run(Object.values(options),(err)=>{
            if(err){
                console.error(err.message);
                return -1; // error occured; same data already exists
            }else{
                return options['id'];
            }
        });
        stmt.finalize();
    }

    searchBy(option){
        const sql = `SELECT * from ${this.tablename} where ${Object.keys(option)[0]}=?`;
        this.db.get(sql,[Object.values(option)[0]],(err,row)=>{
            if(err){
                console.error(err.message);
                return -1; //error occured
            }else{
                if(row){
                    return row; // found row
                }else{
                    return 0; // no row with the given data
                }
            }
        });
    }

    update(option){
        const sql = `UPDATE TABLE ${this.tablename} SET ${Object.keys(option)[1]}=? WHERE ${Object.keys(option)[0]}=?`;
        const stmt = this.db.prepare(sql);
        stmt.run([Object.values(option)[1],Object.values(option)[0]],(err)=>{
            if(err){
                console.error(err.message);
                return -1;
            }else{
                return 1;
            }
        });
        stmt.finalize();
    }
}

module.exports = ParentModel;