import React, { useEffect, useState } from "react";
import { Card, DatePicker, Tag, Spin, Empty, Row, Col, Statistic } from "antd";
import dayjs from "dayjs";
import GetApiCall from "../../helpers/GetApi";
import { useLocation, useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

const MemberAttendanceHistory = ({ id }) => {
  const { memberId } = useParams();

  let finalMemberId = memberId ? memberId : id;

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState(null);
  const [page, setPage] = useState(1);
  const { state: member } = useLocation();

  const fetchData = async (reset = false) => {
    setLoading(true);

    let url = `attendance/memberHistory?memberId=${finalMemberId}&page=${reset ? 1 : page}&limit=15`;

    if (dates) {
      url += `&fromDate=${dates[0].format("YYYY-MM-DD")}&toDate=${dates[1].format("YYYY-MM-DD")}`;
    }

    const res = await GetApiCall.getRequest(url);
    const json = await res.json();

    setSummary(json.summary || {});

    if (reset) {
      setData(json.data);
      setPage(1);
    } else {
      setData((prev) => [...prev, ...json.data]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (finalMemberId) fetchData(true);
  }, [finalMemberId]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) fetchData();
  }, [page]);

  return (
    <div style={{ padding: 12 }}>
      <h2 className="weekly-title mb-4 text-center">Attendance</h2>
      <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
        <div>
          {/* <Button
            variant="link"
            className="p-0 me-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button> */}

          <h4 className="fw-bold mb-0">{member?.fld_name}</h4>
          <small className="text-muted">Membership: {member?.fld_status}</small>
        </div>
      </div>
      {/* Filter */}
      <RangePicker
        style={{ width: "100%", marginBottom: 15 }}
        onChange={(val) => {
          setDates(val);
          fetchData(true);
        }}
      />

      {/* Summary */}
      <Card style={{ marginBottom: 15 }}>
        <Row>
          <Col span={12}>
            <Statistic title="IN" value={summary.totalIN || 0} />
          </Col>
          {/* <Col span={12}>
            <Statistic title="OUT" value={summary.totalOUT || 0} />
          </Col> */}
        </Row>
      </Card>

      {/* Attendance Cards */}
      {data.length === 0 && !loading && <Empty description="No Records" />}

      {data.map((item) => (
        <Card
          key={item.id}
          style={{ marginBottom: 12 }}
          bodyStyle={{ padding: 14 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {dayjs(item.punch_time).format("DD MMM YYYY")}
              </div>
              <div style={{ fontSize: 14, color: "#888" }}>
                {dayjs(item.punch_time).format("hh:mm A")}
              </div>
            </div>

            <Tag
              color={item.punch_type === "IN" ? "green" : "red"}
              style={{ fontSize: 14 }}
            >
              {item.punch_type}
            </Tag>
          </div>

          <div style={{ marginTop: 8, fontSize: 13, color: "#999" }}>
            Device: {item.device_sn || "Manual"}
          </div>
        </Card>
      ))}

      {loading && <Spin style={{ display: "block", margin: "20px auto" }} />}

      {!loading && data.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 10,
            color: "#1677ff",
            cursor: "pointer",
          }}
          onClick={loadMore}
        >
          Load More
        </div>
      )}
    </div>
  );
};

export default MemberAttendanceHistory;
