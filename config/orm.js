var connection = require("../config/connection.js");


// send ? into mysql query
function sendQ(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push('?');
    }
  
    return arr.toString();
  };

  // turn into sql language
function toSQL(to){
    var arr = [];
    
    for (var key in to) {
        var value = to[key];
       
        if (Object.hasOwnProperty.call(to, key)) {
            
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            
            arr.push(key + "=" + value);
        }
    }
    
    return arr.toString();
}

//orm
var orm = {
   
    all: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    
    add: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += sendQ(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += toSQL(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    },
    
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err
            }
            cb(result);
        });
    }
};


module.exports = orm;

