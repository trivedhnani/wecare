import React from "react";
// import { Grid, Card, Carousel, Dropdown, Form, Media, Button } from 'react-bootstrap';
import { Carousel, Form, Button } from "react-bootstrap";
import "./Products.css";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { submitProducts } from "../../controller/productController";
import { logoutUser } from "../../controller/authController";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.location.state.p,
      value: 1
    };
    const products = props.location.state.p;
    console.log(products);
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
     // eslint-disable-next-line 
    this.state.products.quantity = event.target.value;
  };

  addToCart = async product => {
    console.log(product);
    console.log(this.props);
    if (this.props.auth.isAuthenticated) {
      const reqBody = {
        user: this.props.auth.user.id,
        productID: product._id,
        productName: product.title,
        productPrice: product.price,
        quantity: 1
      };
      await axios.post("/api/cart", reqBody);
      this.setState({ showCartAlert: true });
    } else this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 imgPTop"
                  src={process.env.PUBLIC_URL + this.state.products.image1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 imgPTop"
                  src={process.env.PUBLIC_URL + this.state.products.image2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 imgPTop"
                  src={process.env.PUBLIC_URL + this.state.products.image3}
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 imgPTop"
                  src={process.env.PUBLIC_URL + this.state.products.image4}
                  alt="Fourth slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6">
            <div className="row m mt-3">
              <h2>{this.state.products.title}</h2>
            </div>
            <div className="row m">
              <h2>${this.state.products.price}</h2> &nbsp; &nbsp;{" "}
              <h2 className="text-success">50% off</h2>
            </div>
            <div className="row m">
              <h3 class="text-warning">
                <span>
                  <i class="fa fa-star"></i>
                </span>
                <span>
                  <i class="fa fa-star"></i>
                </span>
                <span>
                  <i class="fa fa-star"></i>
                </span>
                <span>
                  <i class="fa fa-star"></i>
                </span>
                <span>
                  <i class="fa fa-star-o"></i>
                </span>
              </h3>
            </div>
            <hr />
            {/* <div className="col-md-6">
              <Form className="m dd">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select Quantity</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div> */}
            <div className="row mt-2 m">
              <h5>
                Seller: &nbsp; <i>{this.state.products.seller}</i>
              </h5>
            </div>
            <div className="row m mt-2">
              <ul>
                <li>{this.state.products.desc1}</li>
                <li>{this.state.products.desc2}</li>
                <li>{this.state.products.desc3}</li>
                <li>{this.state.products.desc3}</li>
                <li>{this.state.products.desc4}</li>
              </ul>
            </div>
            <Button
              variant="secondary"
              onClick={this.addToCart.bind(this, this.state.products)}
            >
              Add to cart
            </Button>{" "}
            &nbsp; &nbsp;
            <Link
              to={{ pathname: "/Orders", state: { p: this.state.products } }}
              className="link"
            >
              <Button variant="primary">Buy Now</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { submitProducts, logoutUser }
)(Product);
//export default Product;
