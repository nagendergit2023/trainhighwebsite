import { Helmet } from "react-helmet";

function SEO({ location }) {
  return (
    <Helmet>
      <title>{location.pageTitle}</title>

      <meta name="title" content={location.metaTitle} />

      <meta
        name="description"
        content={location.metaDescription}
      />

      <meta
        name="keywords"
        content={location.metaKeywords}
      />

      <meta
        name="author"
        content={location.author}
      />

      <meta
        property="og:title"
        content={location.metaOgTitle}
      />

      <meta
        property="og:description"
        content={location.metaOgDescription}
      />

      <meta
        property="og:type"
        content={location.ogType}
      />

      <meta
        property="og:image"
        content={location.ogImage}
      />

      <meta
        property="og:url"
        content={location.ogUrl}
      />

      <meta
        property="og:site_name"
        content={location.ogSiteName}
      />
    </Helmet>
  );
}

export default SEO;