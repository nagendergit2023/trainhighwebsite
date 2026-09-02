import { useParams } from "react-router-dom";
import Locations from "./LocationMicrositeList.js";
import SEO from "./seo.jsx";
import { Col, Container, Row } from "react-bootstrap";

function Branch() {
  const { slug } = useParams();

  const location = Locations[slug];

  console.log(location);

  if (!location) {
    return <h1>404 - Branch Not Found</h1>;
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg={12}>
          <SEO location={location} />

      <h1>{location.pageTitle}</h1>

      <p>{location.address}</p>

      <p>{location.phone}</p>

      <p>{location.email}</p>
      </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Branch;