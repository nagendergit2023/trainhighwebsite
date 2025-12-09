import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 600 },
  { name: "Jun", value: 450 },
];

const dataPerformance = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 600 },
  { name: "Jun", value: 450 },
];

const dataMembers = [
  { name: "Total", uv: 400, fill: "#ffc658" },
  { name: "Active", uv: 375, fill: "#82ca9d" },
  { name: "Inactive", uv: 25, fill: "#8884d8" },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};


function Dashboard() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [pendingRenewals, setPendingRenewals] = useState(0);
  const [totalActiveMembers, setTotalActiveMembers] = useState(0);
  const [totalInactiveMembers, setTotalInactiveMembers] = useState(0);

  // Simulate fetching member count (replace with your API call later)
  useEffect(() => {
    // Simulate a backend API request
    const fetchCount = async () => {
      // Example: simulate delay
      await new Promise((res) => setTimeout(res, 1000));
      // Example dynamic number
      const fetchedCount = 500;
      setTotalMembers(fetchedCount);
    };

    fetchCount();
  }, []);

  useEffect(() => {
    // Simulate a backend API request
    const fetchCount = async () => {
      // Example: simulate delay
      await new Promise((res) => setTimeout(res, 1000));
      // Example dynamic number
      const fetchedCount = 100;
      setPendingRenewals(fetchedCount);
    };

    fetchCount();
  }, []);

  useEffect(() => {
    // Simulate a backend API request
    const fetchCount = async () => {
      // Example: simulate delay
      await new Promise((res) => setTimeout(res, 1000));
      // Example dynamic number
      const fetchedCount = 475;
      setTotalActiveMembers(fetchedCount);
    };

    fetchCount();
  }, []);

  useEffect(() => {
    // Simulate a backend API request
    const fetchCount = async () => {
      // Example: simulate delay
      await new Promise((res) => setTimeout(res, 1000));
      // Example dynamic number
      const fetchedCount = 25;
      setTotalInactiveMembers(fetchedCount);
    };

    fetchCount();
  }, []);


    return (
        <div className='container py-lg-5'>
            <div className='row'>
                {/* <Col lg={3} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="d-flex align-items-center justify-content-center gap-3">
                                <AiOutlineDashboard className="card-icon mb-0" />
                                <Card.Title className="text-capitalize mb-0 text-center">
                                    <h6 className='mb-1'>Total Collection</h6>
                                    <p className='d-flex align-items-center justify-content-center mb-0 fw-bold'><FaIndianRupeeSign /><span>10,00,000</span></p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col lg={3} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="d-flex align-items-center justify-content-center gap-3">
                                <AiOutlineDashboard className="card-icon mb-0" />
                                <Card.Title className="text-capitalize mb-0 text-center">
                                    <h6 className='mb-1'>Pending Collection</h6>
                                    <p className='d-flex align-items-center justify-content-center mb-0 fw-bold'><FaIndianRupeeSign /><span>80,000</span></p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col> */}

                <Col lg={3} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="d-flex align-items-center justify-content-center gap-3">
                                <FaRegUser className="card-icon mb-0" />
                                <Card.Title className="text-capitalize mb-0 text-center">
                                    <h6 className='mb-1'>Total Members</h6>
                                    <p className='d-flex align-items-center justify-content-center mb-0 fw-bold'>
                                        <CountUp end={totalMembers} duration={2.5} separator="," />
                                        </p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                
                <Col lg={3} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="d-flex align-items-center justify-content-center gap-3">
                                <FaRegUser className="card-icon mb-0" />
                                <Card.Title className="text-capitalize mb-0 text-center">
                                    <h6 className='mb-1'>Pending Renewals</h6>
                                    <p className='d-flex align-items-center justify-content-center mb-0 fw-bold'>
                                        <CountUp end={pendingRenewals} duration={2.5} separator="," />
                                        </p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>


                <Col lg={3} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="d-flex align-items-center justify-content-center gap-3">
                                <FaRegUser className="card-icon mb-0" />
                                <Card.Title className="text-capitalize mb-0 text-center">
                                    <h6 className='mb-1'>Active Members</h6>
                                    <p className='d-flex align-items-center justify-content-center mb-0 fw-bold'>
                                        <CountUp end={totalActiveMembers} duration={2.5} separator="," />
                                        </p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                
                <Col lg={3} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="d-flex align-items-center justify-content-center gap-3">
                                <FaRegUser className="card-icon mb-0" />
                                <Card.Title className="text-capitalize mb-0 text-center">
                                    <h6 className='mb-1'>Inactive Members</h6>
                                    <p className='d-flex align-items-center justify-content-center mb-0 fw-bold'>
                                        <CountUp end={totalInactiveMembers} duration={2.5} separator="," />
                                        </p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

                <Col lg={12} className='mb-3'>
                    <Link to="/dashboard" className="text-decoration-none">
                        <Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="">
                                <h5 className="text-dark mb-2">Monthly Overview</h5>

            {/* Responsive Chart Container */}
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>

<Col lg={6}>

<Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="">
                                <h5 className="text-dark mb-2">Members Overview</h5>
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="100%"
                barSize={12}
                data={dataMembers}
              >
                <RadialBar
                  minAngle={15}
                  label={{ position: "insideStart", fill: "#fff" }}
                  background
                  dataKey="uv"
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    lineHeight: "24px",
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
    </Card.Body>
</Card>

</Col>

<Col lg={6}>
<Card className="text-center shadow-sm mb-3 mb-lg-0 bg-light rounded">
                            <Card.Body className="">
                                <h5 className="text-dark mb-2">Monthly Overview</h5>
                                {/* Responsive Chart Container */}
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={dataPerformance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
                                
                                </Card.Body>
                                </Card>
</Col>
        
            </div>
        </div>
    )
}

export default Dashboard