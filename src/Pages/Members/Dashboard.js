import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";
import MemberWorkoutCalendar from "./Workout/MemberWorkoutCalendar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  // Example monthly data
  const data = [
    { name: "Completed", value: 6, fill: "#82ca9d" },
    { name: "Pending", value: 6, fill: "#8884d8" },
    { name: "Fitness Goal (%)", value: 40, fill: "#ffc658" },
    { name: "Monthly Progress (%)", value: 50, fill: "#ffc658" },
  ];

  return (
    <section className="inner-section mt-5">
      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col lg={12} md={12} className="mb-5">
            <h2 className="text-center fw-bold">Hi, {userData?.name}</h2>
            <h2 className="text-center">Your Fitness Stats</h2>
            <div style={{ width: "100%", height: "40vh", minHeight: 350 }}>
              <ResponsiveContainer>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="90%"
                  barSize={20}
                  data={data}
                >
                  <RadialBar
                    minAngle={15}
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    clockWise
                    dataKey="value"
                    animationBegin={400}
                    animationDuration={1200}
                  />
                  {/* <Legend
                        iconSize={12}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      /> */}
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            {/*<MemberWorkoutCalendar
              memberId={
                4
                //loggedInMemberId
              }
            />*/}
            {/* Legend BELOW chart */}
            <div className="d-flex justify-content-center mt-0 flex-wrap gap-3">
              {data.map((item, index) => (
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
                  ></div>
                  {item.name}
                </div>
              ))}
            </div>
          </Col>
          <Col lg={12}>
            <Link
              to="/members/workout"
              className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark"
            >
              View Schedule
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
