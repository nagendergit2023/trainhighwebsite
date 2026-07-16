import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import html2pdf from "html2pdf.js";
import GetApiCall from "../../helpers/GetApi";
import PostApiCall from "../../helpers/PostApi";
import "./NewBatchClass.css";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const toMinutes = (time = "") => {
  const [hours = 0, minutes = 0] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
};

const formatHour = (time = "") => {
  const [hourText = "0"] = String(time).split(":");
  const hour = Number(hourText);
  const normalized = hour > 12 ? hour - 12 : hour;
  return String(normalized || 12);
};

const formatSlotLabel = (start, end) =>
  `${formatHour(start)}-${formatHour(end)}`;

const trainerShortName = (trainer = "") => {
  const firstTrainer = String(trainer).split(",")[0]?.trim();
  if (!firstTrainer || firstTrainer === "Not Assigned") return "";
  return firstTrainer.split(" ")[0].toUpperCase();
};

export default function BatchCalendar() {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);

  const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.rows)) return data.rows;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  const loadCalendar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PostApiCall.postRequest(
        { page: 1, limit: 500, status: "Active" },
        "batch/GetBatches",
      );
      const json = await res.json();
      const rows = normalizeList(json);
      const enriched = await Promise.all(
        rows.map(async (batch) => {
          const batchId = batch.fld_id || batch.id;
          try {
            const detailRes = await GetApiCall.getRequest(
              `batch/GetBatch/${batchId}`,
            );
            const detail = await detailRes.json();
            return {
              ...batch,
              schedule: Array.isArray(detail?.schedule) ? detail.schedule : [],
              trainers:
                batch.trainers ||
                detail?.trainers?.map((trainer) => trainer.fld_name).join(", "),
            };
          } catch (err) {
            return { ...batch, schedule: [] };
          }
        }),
      );
      setClasses(enriched);
    } catch (err) {
      notification.error({ message: "Unable to load class calendar" });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  const { timeSlots, calendarRows, visibleDays } = useMemo(() => {
    const slots = [];
    const rows = weekDays.reduce((acc, day) => ({ ...acc, [day]: {} }), {});

    classes.forEach((batch) => {
      (batch.schedule || []).forEach((slot) => {
        const day = slot.fld_day;
        const start = slot.fld_start_time?.slice(0, 5) || "";
        const end = slot.fld_end_time?.slice(0, 5) || "";
        if (!day || !rows[day] || !start || !end) return;

        const key = `${start}-${end}`;
        if (!slots.some((item) => item.key === key)) {
          slots.push({
            key,
            start,
            end,
            label: formatSlotLabel(start, end),
            sort: toMinutes(start),
          });
        }

        if (!rows[day][key]) rows[day][key] = [];
        rows[day][key].push({
          id: `${batch.fld_id}-${slot.fld_id}`,
          name: batch.fld_batch_name || batch.batchName || "Class",
          trainer: trainerShortName(batch.trainers),
        });
      });
    });

    const sortedSlots = slots.sort((a, b) => a.sort - b.sort);
    const daysWithClasses = weekDays.filter((day) =>
      Object.values(rows[day]).some((items) => items.length),
    );

    return {
      timeSlots: sortedSlots,
      calendarRows: rows,
      visibleDays: daysWithClasses.length
        ? daysWithClasses
        : weekDays.slice(0, 6),
    };
  }, [classes]);

  const printCalendar = () => window.print();

  const downloadPdf = () => {
    if (!printRef.current) return;

    html2pdf()
      .set({
        margin: 8,
        filename: "gym-class-calendar.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(printRef.current)
      .save();
  };

  return (
    <>
      <section className="pb-5 inner-section">
        <Container fluid="xl">
          <Row className="justify-content-center mb-3">
            <Col lg={9}>
              <h2 className="section-title">Class Calendar</h2>
              <p className="text-muted text-center mb-0">
                Printable day-wise schedule for gym display.
              </p>
            </Col>
          </Row>
          <div className="batch-list-header mb-4 no-print">
            <div></div>
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/batches")}
              >
                Batches
              </Button>
              <Button variant="outline-dark" onClick={printCalendar}>
                Print
              </Button>
              <Button onClick={downloadPdf}>Download PDF</Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : (
            <div
              ref={printRef}
              className="batch-calendar-sheet timetable-sheet"
            >
              <div className="calendar-print-title timetable-title">
                <h2>GROUP CLASSES</h2>
              </div>
              <div className="timetable-wrap">
                <table className="group-class-table">
                  <thead>
                    <tr>
                      <th>DAY</th>
                      {timeSlots.map((slot) => (
                        <th key={slot.key}>{slot.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleDays.map((day) => (
                      <tr key={day}>
                        <th>{day.toUpperCase()}</th>
                        {timeSlots.map((slot) => {
                          const items = calendarRows[day]?.[slot.key] || [];
                          return (
                            <td key={slot.key}>
                              {items.map((item) => (
                                <div className="timetable-class" key={item.id}>
                                  {item.name.toUpperCase()}
                                  {item.trainer && (
                                    <span>({item.trainer})</span>
                                  )}
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
