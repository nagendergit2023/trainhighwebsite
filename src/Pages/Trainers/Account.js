import React, { useEffect, useState } from "react";
import { Card, Tag, Row, Col, Statistic, notification } from "antd";
import { useNavigate } from "react-router-dom";
import GetApiCall from "../../helpers/GetApi";
import dayjs from "dayjs";
import { Container } from "react-bootstrap";

const Account = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const trainerId = JSON.parse(user)?.staffId;

  const [data, setData] = useState({});
  const [stats, setStats] = useState({});

  const fetchProfile = async () => {
    const res = await GetApiCall.getRequest(`staff/${trainerId}`);
    const json = await res.json();
    setData(json.data[0] || {});
    setStats({
      totalMembers: json?.totalAssignedMembers,
      activeMembers: json?.activeMembers,
    });
  };

  useEffect(() => {
    if (trainerId) fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Container>
      <div className="my-4" style={{ textAlign: "center" }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="Trainer"
          width={100}
          style={{ borderRadius: "50%" }}
        />
        <h4 style={{ marginTop: 10 }}>{data.name}</h4>
        <Tag color="blue">{data?.role}</Tag>
      </div>

      {/* Professional Stats */}
      <Card style={{ marginBottom: 15 }}>
        <Row>
          <Col span={12}>
            <Statistic title="Total Members" value={stats.totalMembers || 0} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Active Members"
              value={stats.activeMembers || 0}
            />
          </Col>
        </Row>
      </Card>

      {/* Account Info */}
      <Card style={{ marginBottom: 15 }}>
        <p>
          <strong>Code:</strong> {data.staff_code}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.mobile}
        </p>
        <p>
          <strong>Join Date:</strong>{" "}
          {dayjs(data.updated_at).format("DD MMM YYYY")}
        </p>
      </Card>

      {/* Navigation Buttons */}
      <button
        className="btn btn-dark w-100 mb-3"
        onClick={() => navigate("/trainers/members")}
      >
        View My Members
      </button>

      {/* <button
        className="btn btn-dark w-100 mb-3"
        onClick={() => navigate("/attendance-overview")}
      >
        Attendance Overview
      </button> */}

      <button className="btn btn-warning w-100" onClick={handleLogout}>
        Logout
      </button>
    </Container>
  );
};

export default Account;
