const express = require("express");
const router = express.Router();
const sql = require("mysql");
const con = require("../utilites/db");
router.get("/", function (request, response) {
  let schema = request.headers["schema"];
  let whereClause = request.body.whereClause;
  try {
    // const req = new sql.Request(con);
    con.query(
      `SELECT MAX(fld_membership_number) AS membership_number,MAX(fld_application_number) AS application_number FROM New_Gym_Members`,
      function (err, data) {
        if (err) {
          response.status(404).json({
            data:
              "Error processing data. Please contact support for more details." +
              err,
          });
        } else {
          const membershipNumber = data[0].membership_number;
          const appNumber = data[0].application_number;
          const newMembershipNumber = membershipNumber
            ? membershipNumber + 1
            : 1;
          const newappNumber = appNumber ? appNumber + 1 : 1;
          response.status(200).json({
            membershipNumber: newMembershipNumber,
            appNumber: newappNumber,
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
