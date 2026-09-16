import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "./Events.css";

/* =========================================================
   IMPORT ALL EVENT IMAGES
========================================================= */

function importAllImages() {
  try {
    const r = require.context(
      "../../assets/images/events",
      true,
      /\.(png|jpe?g|webp|svg)$/i
    );

    return r.keys().map((key) => ({
      path: key,
      src: r(key).default || r(key),
    }));
  } catch (error) {
    console.error("Event image import failed:", error);
    return [];
  }
}

/* =========================================================
   IMPORT ALBUM METADATA
========================================================= */

function importAlbumMeta() {
  try {
    const r = require.context(
      "../../assets/images/events",
      true,
      /album-meta\.json$/i
    );

    return r.keys().map((key) => ({
      path: key,
      meta: r(key).default || r(key),
    }));
  } catch (error) {
    console.error("Album metadata import failed:", error);
    return [];
  }
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatEventDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   EVENT ALBUM COMPONENT
========================================================= */

const EventAlbums = () => {
  const [albumsByYear, setAlbumsByYear] = useState({});
  const [activeYear, setActiveYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  /* =======================================================
     LOAD ALBUMS
  ======================================================= */

  useEffect(() => {
    const allImages = importAllImages();
    const metaFiles = importAlbumMeta();

    /* -------------------------------------------------------
       MAP METADATA
    ------------------------------------------------------- */

    const metaMap = {};

    metaFiles.forEach(({ path, meta }) => {
      const match = path.match(/\.\/(\d{4})\/([^/]+)\//);

      if (!match) return;

      const year = match[1];
      const folder = match[2];

      metaMap[`${year}/${folder}`] = meta;
    });

    /* -------------------------------------------------------
       GROUP IMAGES BY YEAR + FOLDER
    ------------------------------------------------------- */

    const grouped = {};

    allImages.forEach(({ path, src }) => {
      const match = path.match(/\.\/(\d{4})\/([^/]+)\//);

      if (!match) return;

      const year = match[1];
      const folder = match[2];

      if (!grouped[year]) {
        grouped[year] = {};
      }

      if (!grouped[year][folder]) {
        grouped[year][folder] = [];
      }

      grouped[year][folder].push(src);
    });

    /* -------------------------------------------------------
       FORMAT ALBUMS
    ------------------------------------------------------- */

    const formatted = {};

    Object.entries(grouped).forEach(([year, folders]) => {
      formatted[year] = Object.entries(folders)
        .map(([folder, images]) => {
          const meta = metaMap[`${year}/${folder}`] || {};

          /* -----------------------------------------------
             FIND THUMBNAIL
          ------------------------------------------------ */

          const thumb =
            images.find((img) =>
              img.toLowerCase().includes("thumb")
            ) || images[0];

          /* -----------------------------------------------
             REMOVE THUMBNAIL FROM GALLERY
          ------------------------------------------------ */

          let galleryImages = images.filter(
            (img) => img !== thumb
          );

          /*
             If there is only one image, use it in the
             lightbox as well.
          */

          if (galleryImages.length === 0 && thumb) {
            galleryImages = [thumb];
          }

          return {
            id: `${year}-${folder}`,
            folder,

            title:
              meta.title ||
              folder
                .replace(/[-_]/g, " ")
                .replace(/\b\w/g, (letter) =>
                  letter.toUpperCase()
                ),

            created: meta.created || `${year}-01-01`,

            order:
              typeof meta.order === "number"
                ? meta.order
                : 999,

            description: meta.description || "",

            thumb,

            images: galleryImages,
          };
        })
        .sort((a, b) => {
          const dateDiff =
            new Date(b.created) -
            new Date(a.created);

          if (dateDiff !== 0) {
            return dateDiff;
          }

          return a.order - b.order;
        });
    });

    setAlbumsByYear(formatted);

    /* -------------------------------------------------------
       SELECT LATEST YEAR
    ------------------------------------------------------- */

    const years = Object.keys(formatted)
      .sort()
      .reverse();

    setActiveYear(years[0] || "");
  }, []);

  /* =======================================================
     YEARS
  ======================================================= */

  const years = useMemo(() => {
    return Object.keys(albumsByYear)
      .sort()
      .reverse();
  }, [albumsByYear]);

  /* =======================================================
     CURRENT ALBUMS
  ======================================================= */

  const currentAlbums = useMemo(() => {
    return albumsByYear[activeYear] || [];
  }, [albumsByYear, activeYear]);

  /* =======================================================
     OPEN ALBUM
  ======================================================= */

  const openAlbum = (album) => {
    if (!album?.images?.length) return;

    setCurrentAlbum(album);
    setPhotoIndex(0);
    setIsOpen(true);
  };

  /* =======================================================
     CLOSE LIGHTBOX
  ======================================================= */

  const closeLightbox = () => {
    setIsOpen(false);
    setCurrentAlbum(null);
    setPhotoIndex(0);
  };

  /* =======================================================
     LIGHTBOX SLIDES
  ======================================================= */

  const slides = useMemo(() => {
    if (!currentAlbum?.images?.length) {
      return [];
    }

    return currentAlbum.images.map((image, index) => ({
      src: image,

      title: currentAlbum.title,

      description: currentAlbum.description
        ? `${currentAlbum.description} • Photo ${index + 1
        } of ${currentAlbum.images.length}`
        : `Photo ${index + 1} of ${currentAlbum.images.length
        }`,
    }));
  }, [currentAlbum]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section className="py-5 bg-light">
      <Container>
        {/* =================================================
            HEADER
        ================================================= */}

        <Row className="justify-content-center align-items-center">
          <Col lg={12}>
            <div className="my-lg-0 my-2">
              <h2 className="section-title text-center">
                Events &amp; Celebrations
              </h2>

              <p className="text-center px-lg-5 px-2 mb-3">
                From get-togethers to grand celebrations, we craft meaningful experiences with creativity and precision.
              </p>
            </div>
          </Col>
        </Row>

        {/* =================================================
            YEAR NAVIGATION
        ================================================= */}

        {years.length > 0 && (
          <div
            className="event-year-wrapper"
            aria-label="Event years"
          >
            <div className="event-year-nav">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`event-year-btn ${activeYear === year
                      ? "active"
                      : ""
                    }`}
                  onClick={() =>
                    setActiveYear(year)
                  }
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =================================================
            MOBILE / DESKTOP GALLERY
        ================================================= */}

        {currentAlbums.length > 0 ? (
          <Row className="event-gallery-grid">
            {currentAlbums.map((album, index) => (
              <Col
                key={album.id}
                xs={12}
                md={6}
                lg={4}
                className="event-gallery-col"
              >
                <div className="location-card"
                  onClick={() => openAlbum(album)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {
                      event.preventDefault();
                      openAlbum(album);
                    }
                  }}
                  aria-label={`Open ${album.title} gallery`}
                >
                  {/* IMAGE */}
                  <div className="location-image-wrapper">
                    <Image
                      variant="top"
                      src={album.thumb}
                      alt={album.title}
                      loading={
                        index < 3
                          ? "eager"
                          : "lazy"
                      }
                      className="w-100 img-fluid location-image"
                    />

                    {/* IMAGE GRADIENT */}
                    <div className="location-overlay">

                      {/* TOP INFO */}
                      <div className="event-gallery-top">
                        <span className="event-gallery-date">
                          {formatEventDate(
                            album.created
                          )}
                        </span>

                        <span className="event-gallery-count">
                          {/* <i className="bi bi-images"></i> */}
                          <span>
                            {String(album.images.length).padStart(2, "0")}
                          </span>
                        </span>
                      </div>

                      {/* OPEN BUTTON */}
                      {/* <div className="event-gallery-open">
                        <i className="bi bi-arrow-up-right"></i>
                      </div> */}

                      <div className="location-content">
                        <p className="fw-semibold text-white">{album.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="event-empty-state">
            <div className="event-empty-icon">
              <i className="bi bi-images"></i>
            </div>

            <h3>No events available</h3>

            <p>
              Event albums will appear here once they
              are added.
            </p>
          </div>
        )}

        {/* =================================================
            LIGHTBOX
        ================================================= */}

        <Lightbox
          open={isOpen}
          close={closeLightbox}
          slides={slides}
          index={photoIndex}
          preload={3}
          plugins={[
            Thumbnails,
            Zoom,
            Fullscreen,
          ]}
          animation={{
            fade: 300,
            swipe: 400,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
          }}
          thumbnails={{
            position: "bottom",
            width: 100,
            height: 70,
            border: 0,
            borderRadius: 8,
            padding: 0,
            gap: 8,
          }}
          on={{
            view: ({ index }) =>
              setPhotoIndex(index),
          }}
        />
      </Container>
    </section>
  );
};

export default EventAlbums;