const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
var multipart = require("connect-multiparty");

const AuthenticateUser = require("./api/AuthenticateUser");
const GetMemberList = require("./api/GetMemberList");
const GetInvoiceDetails = require("./api/GetInvoiceDetails");
const AddUserDetails = require("./api/AddUserDetails");
const GetSerialNumber = require("./api/GetSerialNumber");
const AddImage = require("./api/AddImage");

const authMiddleware = require("./middleware/auth");
const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json({ limit: "50MB" }));
app.use(bodyParser.urlencoded({ limit: "50MB", extended: true }));
app.use(cors());
app.use(
  multipart({
    maxFieldsSize: "50MB",
  })
);
app.use("/trainhighgym-api/AuthenticateUser", AuthenticateUser);
app.use("/trainhighgym-api/GetMemberList", GetMemberList);
app.use("/trainhighgym-api/GetInvoiceDetails", GetInvoiceDetails);
app.use("/trainhighgym-api/AddUserDetails", AddUserDetails);
app.use("/trainhighgym-api/GetSerialNumber", GetSerialNumber);
app.use("/trainhighgym-api/AddImage", AddImage);

module.exports = app;
