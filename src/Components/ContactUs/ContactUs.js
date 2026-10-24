import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PostApiCall from "../../helpers/PostApi";
import { notification } from "antd";
import Notiflix from "notiflix";
import GetApiCall from "../../helpers/GetApi";

function ContactUs({
  title = "Get in touch",
  subtitle = "We’re here to help with your questions, feedback, and support needs.",
  bgClass = "bg-white",
  textClass = "text-black",
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState("");

  useEffect(() => {
    GetApiCall.getRequest("GetBranches")
      .then((response) => response.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data?.data || data?.branches || [];
        setBranches(
          list.filter(
            (branch) =>
              branch.fld_status === undefined ||
              String(branch.fld_status).toLowerCase() === "active",
          ),
        );
      })
      .catch(() => setBranches([]));
  }, []);

  const contactus = async () => {
    if (name.trim() && mobile && email.trim() && type && branchId) {
      Notiflix.Loading.circle();
      try {
        const response = await PostApiCall.postRequest({
          fld_name: name.trim(),
          fld_phone: mobile.trim(),
          fld_email: email.trim(),
          fld_subject: `Website enquiry - ${type}`,
          fld_type: type,
          fld_message: message.trim(),
          fld_source: "website",
          fld_status: "new",
          fld_branch_id: branchId,
          fld_client_rep: null,
        }, "UpdateEnquiries");
        const result = await response.json();
        if (response.status === 200 || response.status === 201) {
          setName(""); setEmail(""); setMobile(""); setMessage(""); setType(""); setBranchId("");
          notification.success({ message: "Thanks for your interest! We'll be in touch shortly to help you get started." });
        } else {
          notification.error({ message: result?.message || "Unable to submit your enquiry" });
        }
      } catch (error) {
        notification.error({ message: "Unable to submit your enquiry. Please try again." });
      } finally {
        Notiflix.Loading.remove();
      }
    } else {
      notification.error({
        message: `Please Fill Mandatory Fields`,
      });
      return;
    }
  };
  return (
    <section className={`py-lg-3 py-5 ${bgClass}`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} className="text-center my-4">
            <h1 className={`section-title px-lg-0 px-3 ${textClass}`}>
              {title}
            </h1>
            <p className={`${textClass}`}>{subtitle}</p>
          </Col>
          <Col lg={4}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInputName"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingInputName">Full Name *</label>
            </div>
          </Col>
          <Col lg={4}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInputMobile"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label htmlFor="floatingInputMobile">Mobile Number *</label>
            </div>
          </Col>
          <Col lg={4}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInputEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInputEmail">Email address *</label>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="contactBranch"
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
              >
                <option value="">Select a branch</option>
                {branches.map((branch) => {
                  const id =
                    branch.fld_branch_id ||
                    branch.branch_id ||
                    branch.branchId ||
                    branch.id;
                  const label =
                    branch.fld_branch_name ||
                    branch.branch_name ||
                    branch.name ||
                    branch.location;
                  return (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="contactBranch">Preferred branch *</label>
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-floating mb-3">
              <select
                className="form-control"
                id="floatingInputType"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select enquiry type</option>
                <option value="Franchise">Franchise</option>
                <option value="Membership">Membership</option>
              </select>
              <label htmlFor="floatingInputType">Enquiry For *</label>
            </div>
          </Col>
          <Col lg={12}>
            <div className="form-floating mb-3">
              <textarea
                className="form-control block w-full"
                placeholder="Leave a message here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <label htmlFor="floatingTextarea2">Message</label>
            </div>
          </Col>
          <Col lg={3} className="text-end mb-5">
            <button
              onClick={() => contactus()}
              className="w-100 py-2 btn-lg rounded btn btn-dark border-white"
            >
              Submit
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactUs;
