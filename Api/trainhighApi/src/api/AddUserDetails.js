const express = require("express");
const router = express.Router();
const con = require("../utilites/db");
router.post("/", function (request, response) {
  const p_id = request.body.id;
  const mobile = request.body.mobile;
  const address = request.body.address;
  const membership = request.body.membership;
  const name = request.body.name;
  const pincode = request.body.pincode;
  const state = request.body.state;
  const city = request.body.city;
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;
  const membershipnumber = request.body.membershipnumber;
  const application = request.body.application;

  try {
    con.query(
      "CALL SaveGymMember(?,?,?,?,?,?,?,?,?,?,?,?,@recordId)",
      [
        p_id,
        name,
        mobile,
        address,
        application,
        membershipnumber,
        membership,
        pincode,
        state,
        city,
        startDate,
        endDate,
      ],

      function (error, results, fields) {
        if (error) {
          console.error("Error calling the stored procedure: ", error);
          response
            .status(500)
            .json({ error: "Error saving data to the database." });
        } else {
          response.status(200).json(results[0]);
        }
        // response.send(results);
      }
    );
  } catch (err) {
    response.status(500);
    response.send(err.message);
  }
});
module.exports = router;
