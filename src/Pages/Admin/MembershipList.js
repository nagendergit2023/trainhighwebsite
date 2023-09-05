import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  // Table,
} from "react-bootstrap";
import { Table } from "antd";
import GetApiCall from "../../helpers/GetApi";
import { Link } from "react-router-dom";
import moment from "moment";
import noimage from "../../assets/images/No_Image_Available.jpg";
import { Image } from "antd";
import Hero from "../../Components/Hero/Hero";

function MembershipList() {
  const [memberList, setMemberList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchFieldText, setSearchFieldText] = useState("");
  useEffect(() => {
    GetApiCall.getRequest("GetMemberList").then((results) => {
      results.json().then((obj) => {
        if (results.status == 200 || results.status == 201) {
          setMemberList(obj.data);
          // setMembershipNumber(obj.membershipNumber);
          //   console.log(obj.data[0].VariantImage.split("#")[2]);
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
      },
      {
        title: "Member Image",
        dataIndex: "MemberImage",
      },
      {
        title: "Member Name",
        dataIndex: "MemberName",
        sorter: (a, b) => a.MemberName - b.MemberName,
      },
      {
        title: "Address",
        dataIndex: "Address",
        sorter: (a, b) => a.Address - b.Address,
      },
      {
        title: "Start Date",
        dataIndex: "StartDate",
        sorter: (a, b) => a.StartDate - b.StartDate,
      },
      {
        title: "Mobile No.",
        dataIndex: "MobileNo",
        sorter: (a, b) => a.MobileNo - b.MobileNo,
      },
      {
        title: "Membership",
        dataIndex: "Membership",
        sorter: (a, b) => a.Membership - b.Membership,
      },
      {
        title: "Status",
        dataIndex: "Status",
        sorter: (a, b) => a.Status - b.Status,
      },
      {
        title: "Actions",
        dataIndex: "Action",
      },
    ],
    rows: memberList
      .filter((filtered) => {
        console.log(String(filtered.fld_name).includes(searchFieldText));
        if (searchFieldText == "") {
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
          Address: (data.fld_address, data.fld_city),
          StartDate: moment(data.fld_start_date).format("ll"),
          MobileNo: data.fld_mobile_number,
          Membership: data.fld_membership,
          Status: "",
          Action: (
            <div className="d-flex align-items-center gap-2 justify-content-evenly">
              <Link to="/new-membership" state={{ data: data, type: "renew" }}>
                <Button variant="secondary" className="" size="sm">
                  Renew
                </Button>
              </Link>
              <Link to="/new-membership" state={{ data: data }}>
                <Button variant="secondary" className="" size="sm">
                  Edit
                </Button>
              </Link>
            </div>
          ),
        };
      }),
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
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
                      value={searchField}
                      onChange={(e) => {
                        setSearchField(e.target.value);
                      }}
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col lg={2}>
                    <Button
                      variant="secondary"
                      className="w-100 py-3"
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
                columns={data.columns}
                dataSource={data.rows}
                onChange={onChange}
              />
              {/* <Table striped bordered hover className="w-100">
              <thead>
                <tr>
                  <th>S No.</th>
                  <th>Member Name</th>
                  <th>Address</th>
                  <th>Start Date</th>
                  <th>Mobile No.</th>
                  <th>Membership</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <div className="d-flex align-items-center gap-2 justify-content-evenly">
                      <Button variant="secondary" className="" size="sm">
                        Renew
                      </Button>
                      <Button variant="secondary" className="" size="sm">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <div className="d-flex align-items-center gap-2 justify-content-evenly">
                      <Button variant="secondary" className="" size="sm">
                        Renew
                      </Button>
                      <Button variant="secondary" className="" size="sm">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>
                    <div className="d-flex align-items-center gap-2 justify-content-evenly">
                      <Button variant="secondary" className="" size="sm">
                        Renew
                      </Button>
                      <Button variant="secondary" className="" size="sm">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default MembershipList;
