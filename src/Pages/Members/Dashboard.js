import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";
import MemberWorkoutCalendar from "./Workout/MemberWorkoutCalendar";
import { Link } from "react-router-dom";
import GetApiCall from "../../helpers/GetApi";
import moment from "moment";

const Dashboard = () => {
  const userData =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const memberId = userData?.memberId;

  const [stats, setStats] = useState({
    weeklyCompleted: 0,
    monthlyCompleted: 0,
  });

  useEffect(() => {
    if (!memberId) return;

    GetApiCall.getRequest(`WorkoutProgress/GetMemberDashboardStats/${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch(() => console.log("Error loading stats"));
  }, [memberId]);

  // Example total planned weekly exercises (adjust if needed)
  const totalWeeklyPlanned = 12;

  const weeklyPending = totalWeeklyPlanned - stats.weeklyCompleted;
  // console.log(stats);

  const daysInMonth = moment().daysInMonth();
  const monthlyProgress = Math.min(
    (stats.monthlyCompleted / daysInMonth) * 100,
    100,
  );

  const data = [
    {
      name: "Completed",
      value: stats.weeklyCompleted,
      fill: "#28a745",
    },
    {
      name: "Pending",
      value: weeklyPending > 0 ? weeklyPending : 0,
      fill: "#dc3545",
    },
    {
      name: "Monthly Progress (%)",
      value: monthlyProgress / 10,
      fill: "#ffc658",
    },
  ];
  const monthlyPercent = Math.min(
    (stats.monthlyCompleted / daysInMonth) * 100,
    100,
  );
  return (
    <section className="inner-section mt-5">
      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col lg={12} className="mb-5">
            <h2 className="text-center fw-bold">Hi, {userData?.name}</h2>
            <h4 className="text-center">Your Fitness Stats</h4>

            <div
              style={{
                width: "100%",
                height: "40vh",
                minHeight: 350,
              }}
            >
              <ResponsiveContainer>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="25%"
                  outerRadius="90%"
                  barSize={20}
                  data={data}
                >
                  <RadialBar
                    background
                    clockWise
                    dataKey="value"
                    animationDuration={1200}
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            {/* <div className="mt-4">
              <h6>Monthly Progress</h6>
              <div className="progress" style={{ height: 12 }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${monthlyPercent}%` }}
                ></div>
              </div>
              <small>{Math.round(monthlyPercent)}%</small>
            </div> */}

            {/* Legend */}
            <div className="d-flex justify-content-center mt-3 flex-wrap gap-3">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center text-muted"
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
                  {item.name}: {Math.round(item.value)}
                </div>
              ))}
            </div>
          </Col>

          <Col lg={12}>
            <MemberWorkoutCalendar memberId={memberId} showTodayOnly={true} />
          </Col>

          <Col lg={12} className="mt-4">
            <Row className="g-2">
              <Col md={6}>
                <Link
                  to="/members/classes"
                  className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-dark"
                >
                  Book Classes
                </Link>
              </Col>
              <Col md={6}>
                <Link
                  to="/members/workout"
                  className="text-capitalize py-lg-2 w-100 btn-lg rounded btn btn-outline-dark"
                >
                  View Workout
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;

