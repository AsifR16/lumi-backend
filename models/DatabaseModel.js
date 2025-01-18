const sqlite3 = require("sqlite3").verbose();

class Database{
    constructor(){
        if(!Database.db){
            Database.db = new sqlite3.Database("./database.db",sqlite3.OPEN_READWRITE, (error) => {
                if (error) {
                  console.error(error.message);
                  return -1;
                }
            });
            return Database.db;
        }else{
            return Database.db;
        }
    }
}

module.exports = Database;