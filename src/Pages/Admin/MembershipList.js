import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Table } from "antd";
import GetApiCall from "../../helpers/GetApi.js";
import { Link } from "react-router-dom";
import moment from "moment";
import noimage from "../../assets/images/No_Image_Available.jpg";
import { Image } from "antd";
import Hero from "../../Components/Hero/Hero.js";

function MembershipList() {
  const [memberList, setMemberList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");
  useEffect(() => {
    GetApiCall.getRequest("GetMemberList").then((results) => {
      results.json().then((obj) => {
        if (results.status === 200 || results.status === 201) {
          setMemberList(obj.data);
          // setMembershipNumber(obj.membershipNumber);
        }
      });
    });
  }, []);
  const data = {
    columns: [
      {
        title: "S No.",
        dataIndex: "SNo",
        sorter: (a, b) => a.SNo - b.SNo,
        width: "90px",
      },
      {
        title: "Member Image",
        dataIndex: "MemberImage",
        width: "150px",
      },
      {
        title: "Member Name",
        dataIndex: "MemberName",
        sorter: (a, b) => a.MemberName - b.MemberName,
        width: "100px",
      },
      {
        title: "Address",
        dataIndex: "Address",
        sorter: (a, b) => a.Address - b.Address,
        width: "140px",
      },
      {
        title: "Start Date",
        dataIndex: "StartDate",
        sorter: (a, b) => a.StartDate - b.StartDate,
        width: "140px",
      },
      {
        title: "Mobile No.",
        dataIndex: "MobileNo",
        sorter: (a, b) => a.MobileNo - b.MobileNo,
        width: "140px",
      },
      {
        title: "Membership",
        dataIndex: "Membership",
        sorter: (a, b) => a.Membership - b.Membership,
        width: "100px",
      },
      {
        title: "Status",
        dataIndex: "Status",
        sorter: (a, b) => a.Status - b.Status,
        width: "100px",
      },
      {
        title: "Actions",
        dataIndex: "Action",
        width: "150px",
      },
    ],
    rows: memberList
      .filter((filtered) => {
        if (searchFieldText === "") {
          return filtered;
        }
        if (
          searchFieldText !== "" &&
          String(filtered.fld_name).includes(searchFieldText)
        ) {
          return filtered;
        }
        if (
          searchFieldText !== "" &&
          String(filtered.fld_mobile_number).includes(searchFieldText)
        ) {
          return filtered;
        }
        if (
          searchFieldText !== "" &&
          String(filtered.fld_membership).includes(searchFieldText)
        ) {
          return filtered;
        }
      })
      .map((data, i) => {
        return {
          SNo: i + 1,
          MemberImage: <Image width={100} src={noimage} />,
          MemberName: data.fld_name,
          Address: data.fld_address,
          StartDate: moment(data.fld_start_date).format("ll"),
          MobileNo: data.fld_mobile_number,
          Membership: data.membership_months,
          Status: data.fld_status,
          Action: (
            <div className="d-flex align-items-center gap-2 justify-content-evenly">
              <Link to="/new-membership" state={{ data: data, type: "renew" }}>
                <Button variant="secondary" className="" size="sm">
                  Renew
                </Button>
              </Link>
              <Link to="/new-membership" state={{ data: data, type: "update" }}>
                <Button variant="secondary" className="" size="sm">
                  Edit
                </Button>
              </Link>
            </div>
          ),
        };
      }),
  };
  return (
    <>
      <Hero />
      <section className="py-5 inner-section">
        <Container>
          <Row>
            <Col lg={12} className="mb-lg-4">
              <Form>
                <Row>
                  <Col lg={10}>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Search by Name, Membership ID or Mobile Number"
                      className="mb-3"
                      style={{ fontSize: "15px" }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        value={searchField}
                        onChange={(e) => {
                          setSearchField(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="secondary"
                      className="w-100 py-3 mb-3 mb-lg-0"
                      onClick={() => setSearchFieldText(searchField)}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col lg={12}>
              <Table
                bordered={true}
                striped
                scroll={{ x: "400", y: 800 }}
                columns={data.columns}
                dataSource={data.rows}
                // onChange={onChange}/
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default MembershipList;
