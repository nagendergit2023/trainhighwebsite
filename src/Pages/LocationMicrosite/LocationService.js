import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Col, Container, Row } from "react-bootstrap";
import Locations from "./LocationMicrositeList.js";
import { trainingItems } from "../Training/Training.js";
import Boxing from "../Training/Boxing.js";
import Crossfit from "../Training/Crossfit.js";
import Calisthenics from "../Training/Calisthenics.js";
import Gymnastics from "../Training/Gymnastics.js";
import Pilates from "../Training/Pilates.js";
import Strength from "../Training/Strength.js";
import Yoga from "../Training/Yoga.js";
import RopeClimbing from "../Training/RopeClimbing.js";
import WallClimbing from "../Training/WallClimbing.js";
import GroupClasses from "../Training/GroupClasses.js";
import Taekwondo from "../Training/Taekwondo.js";
import KidsFitness from "../Training/KidsFitness.js";

const servicePages = {
  boxing: Boxing,
  crossfit: Crossfit,
  calisthenics: Calisthenics,
  gymnastics: Gymnastics,
  pilates: Pilates,
  "strength-training": Strength,
  yoga: Yoga,
  "rope-climbing": RopeClimbing,
  "wall-climbing": WallClimbing,
  "group-classes": GroupClasses,
  taekwondo: Taekwondo,
  "kids-fitness": KidsFitness,
};

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Service Not Found | Train High Gym</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Container className="py-5">
        <h1>Service not found</h1>
        <Link to="/locations/janakpuri">View our gym locations</Link>
      </Container>
    </>
  );
}

function LocationService() {
  const { slug, serviceSlug } = useParams();
  const location = Locations[slug];
  const service = trainingItems.find((item) => item.slug === serviceSlug);
  const ServicePage = servicePages[serviceSlug];

  if (
    !location ||
    !service ||
    !ServicePage ||
    !location.serviceSlugs.includes(serviceSlug)
  ) {
    return <NotFound />;
  }

  const canonicalUrl = `https://trainhighgym.com/locations/${location.slug}/services/${service.slug}`;
  const pageTitle = `${service.title} in ${location.localityName} | Train High Gym`;
  const metaDescription = `Explore ${service.title} at Train High Gym in ${location.localityName}, New Delhi. Visit ${location.addressDisplay} or contact our team to ask about this service.`;
  const gymSchema = {
    "@type": "ExerciseGym",
    name: location.name,
    url: location.canonicalUrl,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      ...location.address,
    },
  };
  const safeJsonLd = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} at ${location.name}`,
    serviceType: service.title,
    url: canonicalUrl,
    provider: gymSchema,
    areaServed: "New Delhi",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trainhighgym.com/" },
      { "@type": "ListItem", position: 2, name: location.name, item: location.canonicalUrl },
      { "@type": "ListItem", position: 3, name: service.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Train High Gym" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={location.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={location.ogImage} />
        <script type="application/ld+json">{safeJsonLd(serviceSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
      </Helmet>
      <section className="py-3 bg-light" aria-labelledby="location-service-title">
        <Container>
          <Row>
            <Col lg={12}>
              <nav aria-label="Breadcrumb" className="">
                <Link to={`/locations/${location.slug}`} className="inner-breadcrumb">{location.name}</Link>
                <span aria-hidden="true"> / </span>
                <span>{service.title}</span>
              </nav>
              {/* <h1 id="location-service-title" className="fw-bold">
                {service.title} at Train High Gym {location.localityName}
              </h1>
              <p>{metaDescription}</p>
              <address>{location.addressDisplay}</address>
              <div className="d-flex flex-wrap gap-3">
                <a href={`tel:${location.phone}`}>Call {location.phone}</a>
                <Link to={`/locations/${location.slug}`}>View all branch services</Link>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
      <ServicePage />
    </>
  );
}

export default LocationService;
