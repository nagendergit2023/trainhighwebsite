import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import { DatePicker, Empty, Statistic, Table, Tag, notification } from "antd";

import dayjs from "dayjs";

import GetApiCall from "../../helpers/GetApi.js";

const { RangePicker } = DatePicker;

function Attendence() {
  const pageSize = 15;

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dates, setDates] = useState(null);
  const [appliedDates, setAppliedDates] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [punchType, setPunchType] = useState("");
  const [appliedPunchType, setAppliedPunchType] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [summary, setSummary] = useState({
    totalPunches: 0,
    totalIN: 0,
    totalOUT: 0,
    totalDevices: 0,
    totalMembers: 0,
  });

  const fetchData = useCallback(
    async (requestedPage = page) => {
      setLoading(true);

      try {
        const queryParams = new URLSearchParams({
          page: String(requestedPage),
          limit: String(pageSize),
        });

        if (Array.isArray(appliedDates) && appliedDates[0] && appliedDates[1]) {
          queryParams.append("fromDate", appliedDates[0].format("YYYY-MM-DD"));

          queryParams.append("toDate", appliedDates[1].format("YYYY-MM-DD"));
        }

        if (appliedSearch?.trim()) {
          queryParams.append("search", appliedSearch.trim());
        }

        if (appliedPunchType) {
          queryParams.append("punchType", appliedPunchType);
        }

        const response = await GetApiCall.getRequest(
          `attendance/history?${queryParams.toString()}`,
        );

        const json = await response.json();

        if (!response.ok || json.success === false) {
          throw new Error(
            json.message || json.error || "Unable to fetch attendance history",
          );
        }

        setAttendanceData(Array.isArray(json.data) ? json.data : []);

        setTotal(Number(json.total || 0));
        setPage(Number(json.page || requestedPage));

        setSummary({
          totalPunches: Number(json.summary?.totalPunches || 0),
          totalIN: Number(json.summary?.totalIN || 0),
          totalOUT: Number(json.summary?.totalOUT || 0),
          totalDevices: Number(json.summary?.totalDevices || 0),
          totalMembers: Number(json.summary?.totalMembers || 0),
        });
      } catch (error) {
        console.error("Attendance history fetch error:", error);

        setAttendanceData([]);
        setTotal(0);

        setSummary({
          totalPunches: 0,
          totalIN: 0,
          totalOUT: 0,
          totalDevices: 0,
          totalMembers: 0,
        });

        notification.error({
          message: "Attendance Error",
          description: error.message || "Unable to fetch attendance history",
        });
      } finally {
        setLoading(false);
      }
    },
    [page, appliedDates, appliedSearch, appliedPunchType],
  );

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const applyFilters = () => {
    setPage(1);
    setAppliedDates(dates);
    setAppliedSearch(searchText);
    setAppliedPunchType(punchType);
  };

  const clearFilters = () => {
    setDates(null);
    setAppliedDates(null);

    setSearchText("");
    setAppliedSearch("");

    setPunchType("");
    setAppliedPunchType("");

    setPage(1);
  };

  const getPunchTypeTag = (value) => {
    const normalizedValue = String(value || "")
      .trim()
      .toUpperCase();

    if (normalizedValue === "IN") {
      return <Tag color="green">IN</Tag>;
    }

    if (normalizedValue === "OUT") {
      return <Tag color="red">OUT</Tag>;
    }

    return <Tag>{value || "Unknown"}</Tag>;
  };

  const columns = [
    {
      title: "#",
      key: "serialNumber",
      width: 65,
      fixed: "left",
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Member",
      key: "member",
      width: 210,
      fixed: "left",
      render: (_, record) => (
        <div>
          <div className="fw-semibold">
            {record.member_name || "Unknown Member"}
          </div>

          <small className="text-muted">
            {record.membership_number || `PIN: ${record.user_sn || "-"}`}
          </small>
        </div>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "member_mobile",
      key: "memberMobile",
      width: 140,
      render: (value, record) => value || record.user_sn || "-",
    },
    {
      title: "Punch Date",
      dataIndex: "punch_time",
      key: "punchDate",
      width: 135,
      sorter: (a, b) =>
        dayjs(a.punch_time).valueOf() - dayjs(b.punch_time).valueOf(),
      render: (value) =>
        value && dayjs(value).isValid()
          ? dayjs(value).format("DD MMM YYYY")
          : "-",
    },
    {
      title: "Punch Time",
      dataIndex: "punch_time",
      key: "punchTime",
      width: 120,
      render: (value) =>
        value && dayjs(value).isValid()
          ? dayjs(value).format("hh:mm:ss A")
          : "-",
    },
    {
      title: "Type",
      dataIndex: "punch_type",
      key: "punchType",
      width: 90,
      render: getPunchTypeTag,
    },
    {
      title: "Machine",
      key: "machine",
      width: 250,
      render: (_, record) => (
        <div>
          <div className="fw-semibold">
            {record.machine_name || "Unknown Machine"}
          </div>

          <small className="text-muted">{record.device_sn || "-"}</small>
        </div>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch_name",
      key: "branchName",
      width: 160,
      render: (value) => value || "-",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 120,
      render: (value) =>
        value ? <Tag color="blue">{value}</Tag> : <Tag>Unknown</Tag>,
    },
    {
      title: "Received At",
      dataIndex: "created_at",
      key: "createdAt",
      width: 190,
      render: (value) =>
        value && dayjs(value).isValid()
          ? dayjs(value).format("DD MMM YYYY, hh:mm A")
          : "-",
    },
  ];

  return (
    <section className="pb-5 pt-4 inner-section">
      <Container>
        <Row className="mb-4">
          <Col lg={12}>
            <h2 className="section-title mb-2">Attendance History</h2>

            <p className="text-muted">
              View member punches received from biometric machines.
            </p>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col xl={3} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Statistic title="Total Punches" value={summary.totalPunches} />
              </Card.Body>
            </Card>
          </Col>

          <Col xl={2} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Statistic title="Total IN" value={summary.totalIN} />
              </Card.Body>
            </Card>
          </Col>

          <Col xl={2} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Statistic title="Total OUT" value={summary.totalOUT} />
              </Card.Body>
            </Card>
          </Col>

          <Col xl={2} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Statistic title="Members" value={summary.totalMembers} />
              </Card.Body>
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <Statistic title="Machines" value={summary.totalDevices} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="g-3 align-items-end">
              <Col lg={4} md={6}>
                <FloatingLabel label="Search member or machine">
                  <Form.Control
                    type="text"
                    value={searchText}
                    placeholder="Search member or machine"
                    onChange={(event) => setSearchText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        applyFilters();
                      }
                    }}
                  />
                </FloatingLabel>
              </Col>

              <Col lg={3} md={6}>
                <RangePicker
                  value={dates}
                  format="DD-MM-YYYY"
                  className="w-100 py-3"
                  allowClear
                  onChange={(value) => setDates(value)}
                  disabledDate={(current) =>
                    current && current.isAfter(dayjs().endOf("day"))
                  }
                />
              </Col>

              <Col lg={2} md={6}>
                <FloatingLabel label="Punch Type">
                  <Form.Select
                    value={punchType}
                    onChange={(event) => setPunchType(event.target.value)}
                  >
                    <option value="">All</option>
                    <option value="IN">IN</option>
                    <option value="OUT">OUT</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col lg={3} md={6}>
                <div className="d-flex gap-2">
                  <Button
                    variant="dark"
                    className="w-100 py-2"
                    disabled={loading}
                    onClick={applyFilters}
                  >
                    Apply
                  </Button>

                  <Button
                    variant="outline-secondary"
                    className="w-100 py-2"
                    disabled={loading}
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col lg={12}>
            <Table
              rowKey={(record) => record.id}
              size="small"
              bordered
              loading={loading}
              className="customTable"
              columns={columns}
              dataSource={attendanceData}
              scroll={{
                x: 1450,
              }}
              locale={{
                emptyText: <Empty description="No attendance records found" />,
              }}
              pagination={{
                current: page,
                pageSize,
                total,
                showSizeChanger: false,
                showQuickJumper: true,
                position: ["bottomRight"],
                showTotal: (recordTotal, range) =>
                  `${range[0]}-${range[1]} of ${recordTotal} records`,
                onChange: (newPage) => {
                  setPage(newPage);
                },
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Attendence;
