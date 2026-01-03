import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Tabs,
  Tab,
  Dropdown
} from "react-bootstrap";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

/* ===========================
   IMPORT IMAGES
=========================== */
function importAllImages() {
  try {
    const r = require.context(
      "../../assets/images/events",
      true,
      /\.(png|jpe?g|svg)$/
    );

    return r.keys().map((key) => ({
      path: key,
      src: r(key).default || r(key)
    }));
  } catch (error) {
    console.error("Image import failed:", error);
    return [];
  }
}

/* ===========================
   IMPORT ALBUM METADATA
=========================== */
function importAlbumMeta() {
  try {
    const r = require.context(
      "../../assets/images/events",
      true,
      /album-meta\.json$/
    );

    return r.keys().map((key) => ({
      path: key,
      meta: r(key)
    }));
  } catch (error) {
    console.error("Meta import failed:", error);
    return [];
  }
}

const EventAlbums = () => {
  const [albumsByYear, setAlbumsByYear] = useState({});
  const [activeYear, setActiveYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  /* ===========================
     LOAD & GROUP ALBUMS
  =========================== */
  useEffect(() => {
    const allImages = importAllImages();
    const metaFiles = importAlbumMeta();

    /* ---- Map metadata by year/folder ---- */
    const metaMap = {};
    metaFiles.forEach(({ path, meta }) => {
      const match = path.match(/\.\/(\d{4})\/([^/]+)/);
      if (!match) return;

      const year = match[1];
      const folder = match[2];
      metaMap[`${year}/${folder}`] = meta;
    });

    /* ---- Group images by year/folder ---- */
    const grouped = {};
    allImages.forEach(({ path, src }) => {
      const match = path.match(/\.\/(\d{4})\/([^/]+)/);
      if (!match) return;

      const year = match[1];
      const folder = match[2];

      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][folder]) grouped[year][folder] = [];

      grouped[year][folder].push(src);
    });

    /* ---- Format albums ---- */
    const formatted = {};
    Object.entries(grouped).forEach(([year, folders]) => {
      formatted[year] = Object.entries(folders)
        .map(([folder, images]) => {
          const meta = metaMap[`${year}/${folder}`] || {};

          const thumb =
            images.find((img) =>
              img.toLowerCase().includes("thumb")
            ) || images[0];

          const galleryImages =
            images.length > 1
              ? images.filter((img) => img !== thumb)
              : images;

          return {
            title: meta.title || folder.replace(/_/g, " "),
            created: meta.created || "1970-01-01",
            order: meta.order ?? 999,
            description: meta.description || "",
            thumb,
            images: galleryImages
          };
        })
        .sort((a, b) => {
          const dateDiff =
            new Date(b.created) - new Date(a.created);
          if (dateDiff !== 0) return dateDiff;
          return a.order - b.order;
        });
    });

    setAlbumsByYear(formatted);

    const latestYear = Object.keys(formatted)
      .sort()
      .reverse()[0];

    setActiveYear(latestYear || "");
  }, []);

  /* ===========================
     OPEN ALBUM
  =========================== */
  const openAlbum = (album) => {
    if (!album?.images?.length) return;

    setCurrentAlbum(album);
    setPhotoIndex(0);
    setIsOpen(true);
  };

  /* ===========================
     LIGHTBOX SLIDES
  =========================== */
  const slides =
    currentAlbum?.images.map((img, index) => ({
      src: img,
      title: currentAlbum.title,
      description: currentAlbum.description
        ? `${currentAlbum.description} — Photo ${index + 1}`
        : `Photo ${index + 1}`
    })) || [];

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
            <h2 className="section-title">Events & Celebrations</h2>
            <p className="text-center px-lg-5 px-2 mb-5">
              From get-togethers to grand celebrations, we craft
              meaningful experiences with creativity and precision.
            </p>
          </Col>
        </Row>

        {/* MOBILE YEAR DROPDOWN */}
        <div className="text-center mb-4 d-md-none">
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              {activeYear}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(albumsByYear)
                .sort()
                .reverse()
                .map((year) => (
                  <Dropdown.Item
                    key={year}
                    active={year === activeYear}
                    onClick={() => setActiveYear(year)}
                  >
                    {year}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* MOBILE ALBUM GRID */}
        <div className="d-md-none">
          <Row className="g-4 justify-content-center">
            {albumsByYear[activeYear]?.map((album, index) => (
              <Col key={index} xs={12} sm={10}>
                <Card
                  className="border-0 shadow-sm h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => openAlbum(album)}
                >
                  <Image
                    src={album.thumb}
                    alt={album.title}
                    fluid
                    loading="lazy"
                    style={{
                      height: "240px",
                      objectFit: "cover"
                    }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-semibold">
                      {album.title}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* DESKTOP TABS */}
        <div className="d-none d-md-block">
          <Tabs
            activeKey={activeYear}
            onSelect={(k) => k && setActiveYear(k)}
            className="mb-4"
          >
            {Object.keys(albumsByYear)
              .sort()
              .reverse()
              .map((year) => (
                <Tab eventKey={year} title={year} key={year}>
                  <Row className="g-4 mt-3 justify-content-center">
                    {albumsByYear[year].map((album, index) => (
                      <Col key={index} lg={4} md={6}>
                        <Card
                          className="border-0 shadow-sm h-100"
                          style={{ cursor: "pointer" }}
                          onClick={() => openAlbum(album)}
                        >
                          <Image
                            src={album.thumb}
                            alt={album.title}
                            fluid
                            loading="lazy"
                            style={{
                              height: "240px",
                              objectFit: "cover"
                            }}
                          />
                          <Card.Body className="text-center">
                            <Card.Title className="fw-semibold">
                              {album.title}
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Tab>
              ))}
          </Tabs>
        </div>

        {/* LIGHTBOX */}
        <Lightbox
          open={isOpen}
          close={() => {
            setIsOpen(false);
            setCurrentAlbum(null);
          }}
          slides={slides}
          index={photoIndex}
          preload={2}
          plugins={[Thumbnails, Zoom, Fullscreen]}
          zoom={{ maxZoomPixelRatio: 3 }}
          on={{
            view: ({ index }) => setPhotoIndex(index)
          }}
        />
      </Container>
    </section>
  );
};

export default EventAlbums;