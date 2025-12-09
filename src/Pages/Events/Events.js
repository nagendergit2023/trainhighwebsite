import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";

// Dynamically import all images in /events (Webpack or Vite compatible)
function importAllImages() {
  try {
    // Works for Webpack (Create React App)
    const r = require.context(
      "../../assets/images/events",
      true,
      /\.(png|jpe?g|svg)$/
    );
    return r.keys().map((key) => ({
      path: key,
      src: r(key),
    }));
  } catch (error) {
    console.warn("Dynamic import not supported. Returning empty array.", error);
    return [];
  }
}

const EventAlbums = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [eventAlbums, setEventAlbums] = useState([]);

  // Load images dynamically on mount
  useEffect(() => {
    const allImages = importAllImages();

    // Group by folder
    const albums = {};
    allImages.forEach(({ path, src }) => {
      const match = path.match(/\.\/([^/]+)\//); // folder name
      if (match) {
        const folderName = match[1];
        if (!albums[folderName]) albums[folderName] = [];
        albums[folderName].push(src);
      }
    });

    // Build album objects
    const albumData = Object.entries(albums).map(([folder, images]) => {
      const thumb = images.find((img) => img.includes("thumb")) || images[0];
      const gallery = images.filter((img) => img !== thumb);
      const title = folder
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return { title, folder, thumb, images: gallery };
    });

    setEventAlbums(albumData);
  }, []);

  const openAlbum = (album) => {
    if (!album.images || album.images.length === 0) return;
    setCurrentAlbum(album);
    setPhotoIndex(0);
    setIsOpen(true);
  };

  return (
    // <section className="py-5 bg-light">
    //   <Container>
    //     <h2 className="text-center mb-5 text-dark">Events & Celebrations</h2>

    //     <Row className="g-4 justify-content-center">
    //       {eventAlbums.map((album, index) => (
    //         <Col key={index} lg={4} md={6} sm={8} xs={12}>
    //           <Card
    //             className="border-0 shadow-sm overflow-hidden rounded"
    //             onClick={() => openAlbum(album)}
    //             style={{ cursor: "pointer" }}
    //           >
    //             <Image
    //               src={album.thumb}
    //               alt={`${album.title} thumbnail`}
    //               fluid
    //               style={{ width: "100%", height: "250px", objectFit: "cover" }}
    //             />
    //             <Card.Body className="text-center">
    //               <Card.Title className="text-dark">{album.title}</Card.Title>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //       ))}
    //     </Row>

    //     {isOpen && currentAlbum && (
    //       <Lightbox
    //         mainSrc={currentAlbum.images[photoIndex]}
    //         nextSrc={
    //           currentAlbum.images[
    //             (photoIndex + 1) % currentAlbum.images.length
    //           ]
    //         }
    //         prevSrc={
    //           currentAlbum.images[
    //             (photoIndex + currentAlbum.images.length - 1) %
    //               currentAlbum.images.length
    //           ]
    //         }
    //         onCloseRequest={() => setIsOpen(false)}
    //         onMovePrevRequest={() =>
    //           setPhotoIndex(
    //             (photoIndex + currentAlbum.images.length - 1) %
    //               currentAlbum.images.length
    //           )
    //         }
    //         onMoveNextRequest={() =>
    //           setPhotoIndex((photoIndex + 1) % currentAlbum.images.length)
    //         }
    //         imageTitle={`${currentAlbum.title} - ${photoIndex + 1}`}
    //       />
    //     )}
    //   </Container>
    // </section>
    <section className="">
      <Container>
        <Row>
          <Col lg={12} className="text-center text-dark">
            <h1>Sorry, No Events at this moment!</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EventAlbums;
