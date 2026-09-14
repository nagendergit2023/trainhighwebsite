import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import CrossfitTraining from "../../assets/images/trainings/crossfit_training.jpg";
import "./Blogs.css";
import { Link } from "react-router-dom";

const blogs = [
  // {
  //   id: 1,
  //   title: "The Benefits of CrossFit Training",
  //   image: CrossfitTraining,
  //   author: "Train High Gym",
  //   date: "14 Sep 2026",
  //   description:
  //     "Discover how CrossFit can improve strength, endurance, flexibility, and overall fitness.",
  // },
  // {
  //   id: 2,
  //   title: "How to Build a Stronger Body",
  //   image: CrossfitTraining,
  //   author: "Train High Gym",
  //   date: "12 Sep 2026",
  //   description:
  //     "Learn the essential principles of strength training and how to build a stronger, healthier body.",
  // },
  // {
  //   id: 3,
  //   title: "Fitness Tips for Beginners",
  //   image: CrossfitTraining,
  //   author: "Train High Gym",
  //   date: "10 Sep 2026",
  //   description:
  //     "Starting your fitness journey? Here are some simple and effective tips to help you stay consistent.",
  // },
];

const BlogCard = ({ blog }) => {
  return (
    <Col lg={6} className="mb-4">
      <div className="location-card">
        <div className="location-image-wrapper">
          <Image
            variant="top"
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            className="w-100 img-fluid location-image"
          />


          <div className="location-overlay">
            <div className="location-content">
              <h5 className="mb-2 text-white fw-bold"></h5>


              <div className="d-flex flex-column">
                <h4 className="fw-bold mb-2 text-white">
                  {blog.title}
                </h4>

                <div className="d-lg-flex gap-3 text-white small">
                  <span className="d-block text-start">
                    <strong>Posted by:</strong> {blog.author}
                  </span>

                  <span className="d-block text-start">
                    <strong>Posted on:</strong> {blog.date}
                  </span>
                </div>

                <p className="flex-grow-1 text-white small text-start mb-2">
                  {blog.description}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  target="_self"
                  rel="noopener noreferrer"
                  className="visit-btn"
                >
                  Read more →
                </Link>

              </div>
            </div>
          </div>
        </div>

      </div>
    </Col>
  );
};

function Blogs() {
  return (
    <section className="py-lg-5 py-3">
      <Container>
        {/* Section Header */}
        <Row className="justify-content-center align-items-center">
          <Col lg={12}>
            <div className="my-lg-0 my-2">
              <h2 className="section-title text-center">
                Guide. Support. Unite.
              </h2>

              <p className="text-center px-lg-5 px-2 mb-5">
                Achieve your fitness goals with expert coaching and a
                supportive community.
              </p>
            </div>
          </Col>
        </Row>

        {/* Blog List */}
        <Row>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            <Col lg={12} className="text-center text-dark">
              <p>Sorry, no blogs at this moment!</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default Blogs;