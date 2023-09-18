import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import { useLocation } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";
import moment from "moment";

function TaxInvoice() {
  let location = useLocation();
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [pincode, setPincode] = useState("");
  const [amount, setAmount] = useState(null);
  const [totalamount, setTotalAmount] = useState(null);
  const [cgst, setCgst] = useState(null);
  const [sgst, setSgst] = useState(null);
  const [state, setState] = useState("");
  const [Gst, setGst] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState(null);
  const [memberShip, setMemberShip] = useState("");
  const [email, setEmail] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");
  useEffect(() => {
    if (location.state != null) {
      PostApiCall.postRequest(
        {
          whereClause: `where fld_id = ${location.state[0].fld_id}`,
        },
        "GetInvoiceDetails"
      ).then((results) => {
        results.json().then((obj) => {
          if (results.status == 200 || results.status == 201) {
            if (obj.data.length > 0) {
              setInvoiceDetails(obj.data);
              setMemberShip(obj.data[0].fld_membership_number);
              setName(obj.data[0].fld_name);
              setAddress(obj.data[0].fld_address);
              setMobile(obj.data[0].fld_mobile_number);
              setEmail(obj.data[0].fld_email);
              setGst(obj.data[0].fld_gst);
              setInvoiceDate(obj.data[0].fld_invoice_date);
              setInvoiceNumber(obj.data[0].fld_invoice_number);
              setTotalAmount(obj.data[0].fld_total_amount);
              setAmount(obj.data[0].fld_amount);
              setCgst(obj.data[0].fld_cgst);
              setSgst(obj.data[0].fld_sgst);
            }
          }
        });
      });
    }
  }, []);
  const DownloadInvoicePdf = () => {
    var html2pdf = require("html2pdf.js");
    var element = document.getElementById("orderform");
    var opt = {
      margin: 1,
      filename: "order_form.pdf",
      image: { type: "png", quality: 1.9 },
      html2canvas: {
        scale: 1.1,
        useCORS: true,
        allowTaint: true,
        proxy: null,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      //   pagebreak: {avoid: ‘div’}
    };
    // //
    // New Promise-based usage:
    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {});
  };
  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Col lg={12} className="text-center mb-4">
            <Button
              className="btn btn-secondary w-25"
              onClick={DownloadInvoicePdf}
            >
              Download
            </Button>
          </Col>
          <Row
            className="border"
            id="orderform"
            style={{
              // width: "100%",
              height: "100%",
              padding: "30px",
            }}
          >
            <Col className="mt-3">
              <img src={TrainHighGymLogo} className="w-25" />
            </Col>
            <Col className="mt-3 text-end">
              <h4 className="fw-bold mb-2">INVOICE</h4>
              <p className="mb-2">GSTIN - {Gst} </p>

              <p className="mb-2">Invoice Date - {moment(invoiceDate).format("MM-DD-YYYY")}</p>

              <p className="mb-2">Invoice Number - {invoiceNumber}</p>
            </Col>
            <Col lg={12}>
              <hr />
            </Col>
            <Col lg={12}>
              <p className="mb-2">
                <span
                  className="d-inline-block fw-bold"
                  style={{ width: "150px" }}
                >
                  Membership ID
                </span>{" "}
                - {memberShip}
              </p>
              <p className="mb-2">
                <span
                  className="d-inline-block fw-bold"
                  style={{ width: "150px" }}
                >
                  Name
                </span>{" "}
                - {name}
              </p>
              <p className="mb-2">
                <span
                  className="d-inline-block fw-bold"
                  style={{ width: "150px" }}
                >
                  Address
                </span>{" "}
                - {address}
              </p>
              <p className="mb-2">
                <span
                  className="d-inline-block fw-bold"
                  style={{ width: "150px" }}
                >
                  Mobile
                </span>{" "}
                - {mobile}
              </p>
              <p className="mb-2">
                <span
                  className="d-inline-block fw-bold"
                  style={{ width: "150px" }}
                >
                  E-mail
                </span>{" "}
                - {"  "}
                {email}
              </p>
            </Col>
            <Col lg={12}>
              <hr />
            </Col>
            <Col lg={12}>
              <p className="fw-bold text-center">Payment Summary</p>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td className="text-end fw-bold">
                      Rs. <span>{amount}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>SGST 5%</td>
                    <td className="text-end fw-bold">
                      Rs. <span>{sgst}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>CGST 5%</td>
                    <td className="text-end fw-bold">
                      Rs. <span>{cgst}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Total</td>
                    <td className="text-end fw-bold">
                      Rs. <span>{totalamount}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col lg={12} className="mt-3">
              <p className="small">
                This is a computer generated invoice no signature required.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TaxInvoice;
