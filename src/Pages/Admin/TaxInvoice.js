import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import TrainHighGymLogo from "../../assets/images/train_high_gym_logo.png";
import PostApiCall from "../../helpers/PostApi.js";
import { useLocation } from "react-router-dom";
import Hero from "../../Components/Hero/Hero.js";
import moment from "moment";
import { FaIndianRupeeSign } from "react-icons/fa6";

function TaxInvoice() {
  let location = useLocation();
  const [invoiceDate, setInvoiceDate] = useState("27/10/2026");
  const [amount, setAmount] = useState(null);
  const [totalamount, setTotalAmount] = useState(null);
  const [cgst, setCgst] = useState(null);
  const [sgst, setSgst] = useState(null);
  const [Gst, setGst] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState(null);
  const [memberShip, setMemberShip] = useState("");
  const [email, setEmail] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  useEffect(() => {
    if (location.state != null) {
      PostApiCall.postRequest(
        {
          whereClause: `where fld_id = ${location.state[0]?.fld_id}`,
        },
        "GetInvoiceDetails"
      ).then((results) => {
        results.json().then((obj) => {
          if (results.status === 200 || results.status === 201) {
            if (obj.data.length > 0) {
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
      .then(() => { });
  };
  return (
    <>
      {/* <Hero /> */}
      <section className="inner-section">
        <Container>
          <Row
            className="border m-auto"
            id="orderform"
            style={{
              width: "80%",
              height: "100%",
              padding: "30px",
            }}
          >
            <Col lg={12}>
              <h4 className="fw-bold text-center">TAX INVOICE</h4>
            </Col>
            <Col lg={12}>
              <hr />
            </Col>
            <Col lg={8} className="mt-3">
              <div className="d-flex gap-2">
                <img src={TrainHighGymLogo} className="w-25" alt="logo" />
                <div>
                  <h5 className="fw-bold mb-0">TRAIN HIGH GYM</h5>
                  <p className="mb-0 small">
                    Ground Floor, ESI-Basaidarapur Metro Station,
                  </p>
                  <p className="mb-0 small">
                    New Delhi - 110027
                  </p>
                  <p className="mb-0 small">
                    Phone: +91-9211457555
                  </p>
                  <p className="mb-0 small">
                    Email: trainhighrajouri@gmail.com
                  </p>
                  <p className="mb-0 small">GSTIN - {Gst} </p>
                </div>
              </div>
            </Col>
            <Col lg={4} className="mt-3 text-end small">
              <p className="mb-0">
                Invoice Date - {moment(invoiceDate).format("MM-DD-YYYY")}
              </p>
              <p className="mb-0">Invoice Number - {invoiceNumber}</p>
              <p className="mb-0">Payment Mode - </p>
              <p className="mb-0">Sales Rep - </p>
              <p className="mb-0 fw-bold">Balance Due - <span className="text-danger">₹ {(Number(amount) || 0).toFixed(2)}</span></p>
            </Col>
            <Col lg={12}>
              <hr />
            </Col>
            <Col lg={12}>
              <p className="fw-bold text-center">BILLED TO</p>
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
              {/* <p className="mb-2">
                <span
                  className="d-inline-block fw-bold"
                  style={{ width: "150px" }}
                >
                  E-mail
                </span>{" "}
                - {"  "}
                {email}
              </p> */}
            </Col>
            <Col lg={12}>
              <hr />
            </Col>
            <Col lg={12}>
              <p className="fw-bold text-center">PAYMENT SUMMARY</p>
              <Table striped bordered>
                <thead className="fw-bold small">
                  <tr>
                    <td className="text-center text-wrap">ITEM DESCRIPTION</td>
                    <td className="text-center">ACTIVATION DATE</td>
                    <td className="text-center">EXPIRY DATE</td>
                    <td className="text-center align-top">PRICE</td>
                    <td className="text-center">DISCOUNTED PRICE</td>
                    <td className="text-center">TAX RATE</td>
                    <td className="text-center">TAX AMOUNT</td>
                    <td className="text-center">NET AMOUNT</td>
                  </tr>
                </thead>
                <tbody className="small text-center">
                  <tr>
                    <td>Membership - 12 Months</td>
                    {/* <td>{moment(invoiceDate).format("MM-DD-YYYY")}</td> */}
                    <td>27/10/2026</td>
                    {/* <td>{moment(invoiceDate).format("MM-DD-YYYY")}</td> */}
                    <td>26/10/2027</td>
                    <td>₹<span>{(Number(amount) || 0).toFixed(2)}</span></td>
                    <td className="">
                      ₹<span>{(Number(amount) || 0).toFixed(2)}</span>
                    </td>
                    <td>{Gst}</td>
                    <td className="">
                      ₹<span>{(Number(sgst || 0) + Number(cgst || 0)).toFixed(2)}</span>
                    </td>
                    <td className="">
                      ₹<span>{(Number(totalamount) || 0).toFixed(2)}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Row>
                <Col lg={8} className="d-flex align-items-center">
                  <div>
                    <h5 className="fw-bold mb-0 small">Terms & Conditions:</h5>
                    <ol className="small">
                      <li>Payment is due immediately upon receipt.</li>
                      <li>This is a computer generated document, no signature required.</li>
                    </ol>
                  </div>
                </Col>
                <Col lg={4}>
                  <Table className="small float-end">
                    <tr>
                      <td>Subtotal</td>
                      <td className="text-end fw-bold">
                        ₹<span>{(Number(amount) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>SGST 2.5%</td>
                      <td className="text-end">
                        ₹<span>{(Number(sgst) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>CGST 2.5%</td>
                      <td className="text-end">
                        ₹<span>{(Number(cgst) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Total</td>
                      <td className="text-end fw-bold">
                        ₹<span>{(Number(totalamount) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Payment Made</td>
                      <td className="text-end fw-bold">
                        (-) ₹<span>{(Number(totalamount) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Credit Applied</td>
                      <td className="text-end fw-bold">
                        (-) ₹<span>{(Number(totalamount) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Balance Due</td>
                      <td className="text-end fw-bold text-danger">
                        ₹<span className="text-danger">{(Number(totalamount) || 0).toFixed(2)}</span>
                      </td>
                    </tr>
                  </Table>
                </Col>
              </Row>
            </Col>
            <Col lg={12}>
              <hr />
            </Col>
            <Col lg={12} className="mt-3">
              <p className="small text-center mb-0">
                If you have any questions about this invoice, please contact
              </p>
              <p className="small text-center mb-0">
                Phone: +91-9211457555, Email: trainhighrajouri@gmail.com
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg={12} className="text-center mt-4">
              <Button className="btn btn-dark w-25" onClick={DownloadInvoicePdf}>
                Download
              </Button>
            </Col>
          </Row>
        </Container>
      </section >
    </>
  );
}

export default TaxInvoice;
