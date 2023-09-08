const http = require("http");
const app = require("./src/app");
// const express = require("express");
// const app = express();
// const dbConfig = require("./config.json");

// var db;
// const mysql = require("mysql");
// app.use(express.json());

const port = process.env.PORT || 3306;
// app.listen(port, () => {
//   console.log("Server Listening on PORT:", port);
//   console.log(dbConfig);
//   var con = mysql.createConnection(dbConfig);

//   con.connect(function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Connected!");
//       con.query("SELECT * FROM authenticate_user", function (err, result) {
//         if (err) throw err;
//         console.log("Result: " + JSON.stringify(result));
//       });
//     }
//   });
// });
const server = http.createServer(app);
server.listen(port);
console.log("Listing at port", port);
