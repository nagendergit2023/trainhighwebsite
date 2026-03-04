import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GetApiCall from "../../helpers/GetApi";

const Dashboard = () => {
  const user = localStorage.getItem("user");
  const trainerId = JSON.parse(user)?.staffId;

  const [trainer, setTrainer] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const res = await GetApiCall.getRequest(`staff/${trainerId}`);
      const json = await res.json();

      setTrainer(json.staff || {});

      const active = json.activeMembers || 0;
      const total = json.totalAssignedMembers || 0;

      setChartData([
        { name: "Active Clients", value: active, fill: "#82ca9d" },
        { name: "Total Assigned", value: total, fill: "#8884d8" },
        {
          name: "Inactive Clients",
          value: total - active,
          fill: "#ffc658",
        },
      ]);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (trainerId) fetchDashboardData();
  }, []);

  return (
    <section className="pt-0 pb-5 inner-section mt-3">
      <Container className="pb-4">
        <Row className="justify-content-center">
          <Col lg={12} md={12} className="mb-5">
            <h2 className="text-center fw-bold">Hi, {trainer?.name}</h2>
            <h4 className="text-center text-muted">
              Your Performance Overview
            </h4>

            <div style={{ width: "100%", height: "40vh", minHeight: 350 }}>
              <ResponsiveContainer>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="25%"
                  outerRadius="90%"
                  barSize={18}
                  data={chartData}
                >
                  <RadialBar
                    minAngle={10}
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    clockWise
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1200}
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="d-flex justify-content-center mt-3 flex-wrap gap-4">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center text-muted"
                  style={{ fontSize: "1rem" }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: item.fill,
                      marginRight: 8,
                    }}
                  />
                  {item.name} ({item.value})
                </div>
              ))}
            </div>
          </Col>

          <Col lg={12}>
            <Link
              to="/trainers/members"
              className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark"
            >
              View My Clients
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
