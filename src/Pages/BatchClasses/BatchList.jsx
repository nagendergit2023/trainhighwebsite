import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

import Hero from "../../Components/Hero/Hero";
import GetApiCall from "../../helpers/GetApi";
import BatchCard from "../../Components/Batches/BatchCard";
import PostApiCall from "../../helpers/PostApi";

export default function BatchList() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const res = await PostApiCall.postRequest({}, "batch/GetBatches");

      const json = await res.json();

      setBatches(json?.rows || []);
    } catch {
      notification.error({
        message: "Unable to load batches",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Hero />

      <section className="inner-section py-5">
        <Container>
          <div className="d-flex justify-content-between mb-4">
            <h3>Batch Classes</h3>

            <Button onClick={() => navigate("/batch/new")}>+ New Batch</Button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : (
            <Row>
              {batches.map((batch) => (
                <Col lg={6} key={batch.id} className="mb-4">
                  <BatchCard batch={batch} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}
