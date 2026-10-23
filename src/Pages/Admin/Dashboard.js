
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaIndianRupeeSign, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GetApiCall from "../../helpers/GetApi.js";

const salesData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 600 },
  { name: "Jun", value: 450 },
];

const initialStats = {
  totalCollection: 0,
  totalMembers: 0,
  pendingRenewals: 0,
  totalActiveMembers: 0,
  totalInactiveMembers: 0,
  totalEnquiries: 0,
  pendingCollection: 0,
};

const normalizeStatus = (value) =>
  String(value ?? "").trim().toUpperCase();

const isSuccessful = (response) =>
  response.status === 200 || response.status === 201;

const extractRecords = (result) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.data)) return result.data.data;
  if (Array.isArray(result?.result)) return result.result;
  if (Array.isArray(result?.enquiries)) return result.enquiries;
  if (Array.isArray(result?.members)) return result.members;
  return [];
};

const DashboardCard = ({ title, value, icon, currency = false }) => (
  <Col xs={12} sm={6} xl={3} className="mb-3">
    <Link to="/dashboard" className="text-decoration-none">
      <Card className="h-100 text-center shadow-sm bg-light rounded">
        <Card.Body className="d-flex align-items-center justify-content-center gap-3">
          {icon}
          <div className="text-center">
            <h6 className="mb-1 text-dark">{title}</h6>
            <p className="d-flex align-items-center justify-content-center mb-0 fw-bold text-dark">
              {currency && <FaIndianRupeeSign className="me-1" />}
              <CountUp
                end={Number(value) || 0}
                duration={2.5}
                separator=","
              />
            </p>
          </div>
        </Card.Body>
      </Card>
    </Link>
  </Col>
);

const SalesChart = ({ title, data, gradientId, height = 300 }) => (
  <Card className="h-100 shadow-sm bg-light rounded">
    <Card.Body>
      <h5 className="text-dark mb-3">{title}</h5>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card.Body>
  </Card>
);

const OverviewChart = ({ title, data }) => (
  <Card className="h-100 shadow-sm bg-light rounded">
    <Card.Body>
      <h5 className="text-dark mb-3">{title}</h5>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <RadialBarChart
            cx="40%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={12}
            data={data}
          >
            <RadialBar
              minAngle={15}
              background
              dataKey="uv"
              label={{ position: "insideStart", fill: "#fff" }}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ right: 0, lineHeight: "24px" }}
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card.Body>
  </Card>
);

function Dashboard() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    let cancelled = false;

    const getUserScope = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      return {
        isSuperAdmin: normalizeStatus(user.role) === "SUPER ADMIN",
        branchId: user.branch_id,
      };
    };

    const filterByBranch = (records, scope) => {
      if (scope.isSuperAdmin) return records;
      if (scope.branchId == null) return [];

      return records.filter((record) => {
        const recordBranch =
          record.fld_branch_id ??
          record.branch_id ??
          record.fld_branchid;

        return (
          recordBranch != null &&
          String(recordBranch) === String(scope.branchId)
        );
      });
    };

    const fetchEnquiries = async () => {
      try {
        const scope = getUserScope();
        const response = await GetApiCall.getRequest("GetEnquiries");

        if (!isSuccessful(response)) {
          throw new Error(`GetEnquiries failed: ${response.status}`);
        }

        const result = await response.json();
        const enquiries = extractRecords(result);
        const filtered = filterByBranch(enquiries, scope);

        console.log("Enquiry API response:", result);
        console.log("Total enquiries returned:", enquiries.length);
        console.log("Filtered enquiry count:", filtered.length);

        if (!cancelled) {
          setStats((previous) => ({
            ...previous,
            totalEnquiries: filtered.length,
          }));
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);

        if (!cancelled) {
          setStats((previous) => ({
            ...previous,
            totalEnquiries: 0,
          }));
        }
      }
    };

    const fetchMembers = async () => {
      try {
        const scope = getUserScope();
        const response = await GetApiCall.getRequest("GetMemberList");

        if (!isSuccessful(response)) {
          throw new Error(`GetMemberList failed: ${response.status}`);
        }

        const result = await response.json();
        const members = filterByBranch(extractRecords(result), scope);

        const active = members.filter(
          (member) => normalizeStatus(member.fld_status) === "ACTIVE"
        );

        const expired = members.filter(
          (member) => normalizeStatus(member.fld_status) === "EXPIRED"
        );

        const inactive = members.filter(
          (member) => normalizeStatus(member.fld_status) === "INACTIVE"
        );

        const totalCollection = active.reduce(
          (total, member) =>
            total + (Number(member.fld_amount_permnth) || 0),
          0
        );

        if (!cancelled) {
          setStats((previous) => ({
            ...previous,
            totalCollection,
            totalMembers: members.length,
            pendingRenewals: expired.length,
            totalActiveMembers: active.length,
            totalInactiveMembers: inactive.length,
          }));
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchEnquiries();
    fetchMembers();

    return () => {
      cancelled = true;
    };
  }, []);

  const memberChartData = [
    { name: "Total", uv: stats.totalMembers, fill: "#ffc658" },
    { name: "Active", uv: stats.totalActiveMembers, fill: "#82ca9d" },
    { name: "Inactive", uv: stats.totalInactiveMembers, fill: "#8884d8" },
  ];

  const staffChartData = [
    { name: "Sales Team", uv: 10, fill: "#ffc658" },
    { name: "Freelancer", uv: 20, fill: "#82ca9d" },
    { name: "Payroll", uv: 5, fill: "#8884d8" },
  ];

  const userIcon = <FaRegUser className="card-icon flex-shrink-0" />;
  const dashboardIcon = (
    <AiOutlineDashboard className="card-icon flex-shrink-0" />
  );

  return (
    <div className="container py-5">
      <Row>
        <DashboardCard
          title="Total Collection"
          value={stats.totalCollection}
          icon={dashboardIcon}
          currency
        />
        <DashboardCard
          title="Pending Collection"
          value={stats.pendingCollection}
          icon={dashboardIcon}
          currency
        />
        <DashboardCard
          title="Total Members"
          value={stats.totalMembers}
          icon={userIcon}
        />
        <DashboardCard
          title="Pending Renewals"
          value={stats.pendingRenewals}
          icon={userIcon}
        />
        <DashboardCard
          title="Active Members"
          value={stats.totalActiveMembers}
          icon={userIcon}
        />
        <DashboardCard
          title="Inactive Members"
          value={stats.totalInactiveMembers}
          icon={userIcon}
        />
        <DashboardCard
          title="Pending Payments"
          value={0}
          icon={userIcon}
        />
        <DashboardCard
          title="Enquiries"
          value={stats.totalEnquiries}
          icon={userIcon}
        />

        <Col xs={12} className="mb-3">
          <SalesChart
            title="Monthly Sales"
            data={salesData}
            gradientId="monthlySalesGradient"
            height={250}
          />
        </Col>

        <Col xs={12} lg={6} className="mb-3">
          <OverviewChart title="Membership Overview" data={memberChartData} />
        </Col>

        <Col xs={12} lg={6} className="mb-3">
          <SalesChart
            title="Quarterly Sales"
            data={salesData}
            gradientId="quarterlySalesGradient"
          />
        </Col>

        <Col xs={12} lg={6} className="mb-3">
          <OverviewChart title="Staff Overview" data={staffChartData} />
        </Col>

        <Col xs={12} lg={6} className="mb-3">
          <SalesChart
            title="YTD Sales"
            data={salesData}
            gradientId="ytdSalesGradient"
          />
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;