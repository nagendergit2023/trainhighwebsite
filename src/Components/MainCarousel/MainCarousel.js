import React from 'react';
import { Carousel } from "react-bootstrap";
import SliderOne from "../../assets/images/train_high_gym_coming_soon_1.webp";
import SliderTwo from "../../assets/images/train_high_gym_coming_soon_2.webp";
import SliderThree from "../../assets/images/train_high_gym_coming_soon_3.webp";

function MainCarousel() {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SliderOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>First slide label</h1>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SliderTwo}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1>Second slide label</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SliderThree}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1>Third slide label</h1>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default MainCarousel