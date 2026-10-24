import { useParams } from "react-router-dom";
import Locations from "./LocationMicrositeList.js";
import SEO from "./seo.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Branch() {
  const { slug } = useParams();

  const location = Locations[slug];

  if (!location) {
    return (
      <>
        <Helmet>
          <title>Branch Not Found | Train High Gym</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <h1>404 - Branch Not Found</h1>
      </>
    );
  }

  return (
    <section>
      <Container fluid>
        <Row>
          <Col lg={12} className="px-0">
            <SEO location={location} />
            <section
              className="py-4 bg-light"
              aria-labelledby="branch-page-title"
            >
              <Container>
                <h1 id="branch-page-title" className="h2 fw-bold">
                  {location.heading}
                </h1>
                <p>{location.intro}</p>
                <address className="mb-2">{location.addressDisplay}</address>
                <div className="d-flex flex-wrap gap-3">
                  <a
                    href={`tel:${location.phone}`}
                    aria-label={`Call ${location.name}`}
                  >
                    Call {location.phone}
                  </a>
                  <a
                    href={`${location.location}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                  </a>
                  <Link to="/contact-us">Ask about membership</Link>
                </div>
              </Container>
            </section>
            {location?.section1}
            {location?.section2}
            {location?.section3}
            {location?.section4}
            {location?.section5}
            {location?.section6}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Branch;
