import React from "react";
import {
  Jumbotron,
  Carousel,
  Card,
  // Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import carousel1 from "../../assets/images/carouselN2.jpg";
import carousel2 from "../../assets/images/carousel2.jpg";
import carousel3 from "../../assets/images/carousel3.jpg";
import carousel4 from "../../assets/images/carouselN1.jpg";
import card1 from "../../assets/images/pharmacy.jpg";
import card2 from "../../assets/images/appointment.jpg";
import card3 from "../../assets/images/blog.jpg";
import card4 from "../../assets/images/costest.png";

import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <Jumbotron>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel1} alt="First slide" />
            <Carousel.Caption>
              <p className="caption">
                {" "}
                At We Care, we're redefining what a health plan can do.
              </p>
              <h5 className="headCaption">WE CARE</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={carousel2} alt="Third slide" />

            <Carousel.Caption>
              <p className="caption">Welcome to the We Care</p>
              <h5 className="headCaption">WE CARE</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel3}
              width="100%"
              alt="Third slide"
            />

            <Carousel.Caption>
              <p className="caption">
                We bridge innovation science with state-of-the-art clinical
                medicine.
              </p>
              <h5 className="headCaption">Revolutionizing Care</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={carousel4} width="100%" alt="Fourth slide" />

            <Carousel.Caption>
              <p className="caption">
                The Comfort You Want ... The Services You Need ...
              </p>
              <h5 className="headCaption">WE CARE</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Jumbotron>

      <Container>
        <Row>
          <Col>
            <Card className="cardlayout cardInfo" style={{ width: "18rem" }}>
              <Link to="/products">
              <img className="d-block w-100" src={card1} alt="First slide" />
              </Link>
              <Card.Body>
                <Card.Title>PHARMACY!</Card.Title>
                <Card.Text>
                  Find what you need from our variety of medicines
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="cardlayout cardInfo" style={{ width: "18rem" }}>
              {/* <Link to="/appointment"> */}
              <img className="d-block w-100" src={card2} alt="Second card" />
              {/* </Link> */}
              <Card.Body>
                <Card.Title>Find a doctor</Card.Title>
                <Card.Text>
                  Not feeling well?Come search by doctor name or department
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="cardlayout cardInfo" style={{ width: "18rem" }}>
              <Link to="/blog">
                <img className="d-block w-100" src={card3} alt="Third card" />
              </Link>
              <Card.Body>
                <Card.Title> Health and Care</Card.Title>
                <Card.Text>
                  Wellness Miunute blog features daily research-based articles
                  on nutrition and weight loss. Learn about foods you should eat
                  more of, foods to avoid, and the scientific reasoning behind
                  everything the site teaches you.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="cardlayout cardInfo" style={{ width: "18rem" }}>
              <Link to="/cart">
                <img className="d-block w-100" src={card4} alt="Fourth card" />
              </Link>
              <Card.Body>
                <Card.Title> Cost Estimates </Card.Title>
                <Card.Text>
                  Request a Cost Estimate for Your Health Care Services
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
