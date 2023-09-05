const express = require("express");
const router = express.Router();
const sql = require("mysql");
const con = require("../utilites/db");
const auth = require("../middleware/auth");
router.get("/", function (request, response) {
  let schema = request.headers["schema"];
  let whereClause = request.body.whereClause;
  try {
    // const req = new sql.Request(con);
    con.query(
      `SELECT * FROM trainhighgym_db.udv_gym_members`,
      function (err, data) {
        if (err) {
          response.status(404).json({
            data:
              "Error processing data. Please contact support for more details." +
              err,
          });
        } else {
          // console.log(data);
          response.status(200).json({
            data: data,
          });
        }
      }
    );
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});
module.exports = router;
