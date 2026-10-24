import { Helmet } from "react-helmet";

function SEO({ location }) {
  const gymSchema = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${location.canonicalUrl}#gym`,
    name: location.name,
    url: location.canonicalUrl,
    image: location.ogImage,
    telephone: location.phone,
    email: location.email,
    address: {
      "@type": "PostalAddress",
      ...location.address,
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Train High Gym",
      url: "https://trainhighgym.com/",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://trainhighgym.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: location.name,
        item: location.canonicalUrl,
      },
    ],
  };

  const safeJsonLd = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <Helmet>
      <title>{location.pageTitle}</title>
      <meta name="description" content={location.metaDescription} />
      <link rel="canonical" href={location.canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Train High Gym" />
      <meta property="og:title" content={location.pageTitle} />
      <meta property="og:description" content={location.metaDescription} />
      <meta property="og:url" content={location.canonicalUrl} />
      <meta property="og:image" content={location.ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={location.pageTitle} />
      <meta name="twitter:description" content={location.metaDescription} />
      <meta name="twitter:image" content={location.ogImage} />
      <script type="application/ld+json">{safeJsonLd(gymSchema)}</script>
      <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
    </Helmet>
  );
}

export default SEO;
