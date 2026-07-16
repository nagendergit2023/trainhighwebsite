import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import html2pdf from "html2pdf.js";
import GetApiCall from "../../helpers/GetApi";
import "../BatchClasses/NewBatchClass.css";

export default function MemberBatchTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ticketRef = useRef(null);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const memberId =
    user?.memberId || user?.member_id || user?.fld_id || user?.id;
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(location.state?.batch || null);
  const [schedule, setSchedule] = useState(
    location.state?.batch?.schedule || [],
  );
  const bookingDate = location.state?.bookingDate || new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const loadTicket = async () => {
      setLoading(true);
      try {
        const res = await GetApiCall.getRequest(`batch/GetBatch/${id}`);
        const json = await res.json();
        if (json?.batch) {
          setBatch(json.batch);
          setSchedule(Array.isArray(json.schedule) ? json.schedule : []);
        }
      } catch (err) {
        notification.error({ message: "Unable to load booking ticket" });
      }
      setLoading(false);
    };

    loadTicket();
  }, [id]);

  const ticketNo = `BT-${id}-${memberId || "MEM"}`;
  const bookedDate = new Date(`${bookingDate}T00:00:00`);
  const bookedDay = bookedDate.toLocaleDateString("en-US", { weekday: "long" });
  const displayDate = bookedDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const firstSlot =
    schedule.find((item) => item.fld_day === bookedDay) ||
    location.state?.batch?.matchingSlots?.[0] ||
    schedule[0] ||
    {};

  const downloadPdf = () => {
    if (!ticketRef.current) return;
    html2pdf()
      .set({
        margin: 10,
        filename: `${ticketNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(ticketRef.current)
      .save();
  };

  return (
    <>
      <section className="inner-section batch-class-page">
        <Container>
          <div className="batch-list-header mb-4 no-print">
            <div>
              <h2 className="text-center mb-2 weekly-title">Booking Ticket</h2>
              <p className="text-muted text-center mb-0">
                Show this ticket at the gym counter.
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant="outline-secondary"
                onClick={() => navigate("/members/classes")}
              >
                Classes
              </Button>
              <Button variant="outline-dark" onClick={() => window.print()}>
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
            <div ref={ticketRef} className="booking-ticket-card">
              <div className="ticket-brand">Train High Gym</div>
              <h2>
                {batch?.fld_batch_name || batch?.batchName || "Batch Booking"}
              </h2>
              <div className="ticket-number">{ticketNo}</div>

              <div className="ticket-grid">
                <div>
                  <span>Member</span>
                  <strong>
                    {user?.name ||
                      user?.fld_name ||
                      user?.member_name ||
                      "Member"}
                  </strong>
                </div>
                <div>
                  <span>Mobile</span>
                  <strong>
                    {user?.mobile || user?.fld_mobile_number || "-"}
                  </strong>
                </div>
                <div>
                  <span>Class Date</span>
                  <strong>{displayDate}</strong>
                </div>
                <div>
                  <span>Time</span>
                  <strong>
                    {firstSlot.fld_start_time?.slice(0, 5) || "-"} -{" "}
                    {firstSlot.fld_end_time?.slice(0, 5) || "-"}
                  </strong>
                </div>
                <div>
                  <span>Room</span>
                  <strong>{batch?.fld_room_name || "Studio"}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>Booked</strong>
                </div>
              </div>

              <p className="text-muted mt-4 mb-0">
                Please reach 10 minutes before class time. Final attendance is
                confirmed by gym staff.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

