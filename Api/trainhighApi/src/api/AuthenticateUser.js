const express = require("express");
const router = express();
router.use(express.json());
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$10$2aWrrIweEzUV8e43llzex.ayVf75Q5BGdTs5uRZwH5T7ndVyHKZfe", // hashed password: 'password1'
  },
  {
    id: 2,
    username: "user2",
    password: "$2b$10$2aWrrIweEzUV8e43llzex.ayVf75Q5BGdTs5uRZwH5T7nd", // hashed password: 'password1'
  },
];
const sql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { VarChar } = require("mssql");
const con = require("../utilites/db");
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  const user = users.find((user) => user.username === username);
  // const query = "SELECT * FROM authenticate_user WHERE fld_username = ?";
  console.log(
    users.find((user) => user.username === username),
    password === user.password
  );
  if (!user || !password === user.password) {
    return res.status(401).json({ message: "Invalid username or password" });
  } else {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "secret_key",
      {
        expiresIn: "3h", // Token expiration time
      }
    );

    // Return the token to the client
    res.json({ token });
  }
});

//   con.query(query, ["admin"], (err, results) => {
//     // console.log(err, results);
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "An error occurred" });
//     } else if (results.length === 0) {
//       res.status(401).json({ error: "Invalid username or password" });
//     } else {
//       const user = results[0];
//       // password = jwt.sign({ userId: user.fld_user_id }, "SGJFSG%$JBJK");
//       // Compare the provided password with the hashed password stored in the database
//       bcrypt.compare("test1", "test123", (err, result) => {
//         console.log(results[0]);
//         // console.error(result, password, err, results);

//         if (result) {
//           // Generate a JSON Web Token (JWT)
//           console.log(user.fld_user_id);
//           const token = jwt.sign({ userId: user.fld_user_id }, "SGJFSG%$JBJK");

//           res.status(200).json({ token });
//         } else {
//           console.log("bdmdh");
//           res.status(401).json({ error: "Invalid username or password" });
//         }
//       });
//     }
//   });
// });
// router.post("/", function (request, response) {
//   var email = request.body.email;
//   var password = request.body.password;
//   var action = request.body.action;
//   var actiondate = request.body.actiondate;
//   try {
//     con.query(
//       "SELECT * FROM authenticate_user WHERE fld_username = ? AND fld_password = ? ",
//       [email, password],
//       function (error, results, fields) {
//         if (error) throw error;
//         if (results.length > 0) {
//           // Authenticate the user
//           request.session.loggedin = true;
//           request.session.email = email;
//         } else {
//           response.send("Incorrect Username and/or Password!");
//         }
//         response.send(results);
//       }
//     );
//   } catch (err) {
//     response.status(500);
//     response.send(err.message);
//   }
// });
module.exports = router;
