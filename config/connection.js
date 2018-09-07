var mysql = require("mysql");


    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "tweety21",
        database: "burgers_db"
    });


connection.connect(function(err) {
    if (err) {
        console.error("error at: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


module.exports = connection;