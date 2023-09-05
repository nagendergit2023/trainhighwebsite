const mysql = require("mysql");
const dbConfig = require("../config.json");

var con = mysql.createPool(dbConfig);
// console.log(con.query);
con.getConnection(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
    con.query("SELECT * FROM authenticate_user", function (err, result) {
      if (err) throw err;
      // console.log("Result: " + JSON.stringify(result));
    });
  }
  con.on("error", (err) => {
    console.error("Database connection error: ", err);
    // You might want to handle the error appropriately, for example, try reconnecting
  });
});

module.exports = con;
