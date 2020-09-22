import React from 'react';
import axios from "axios";
import './Products.css';
import './Cart.css';
import { Alert, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitProducts } from "../../controller/productController";
import { logoutUser } from "../../controller/authController";


class Products extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: []
    }

    this.getProductsData();
  }

  getProductsData() {
    axios
      .get("/api/productsData/submitProducts").then((response) => {
        this.setState({ products: response.data })
    });
  }

  buyNow = () => {
    if (this.props.auth.isAuthenticated)
      this.props.history.push("/buyNow");
    else
      this.props.history.push("/login");
  }

  cart = () => {
    if (this.props.auth.isAuthenticated)
      this.props.history.push("/cart");
    else
      this.props.history.push("/login");
  }

  addToCart = async (product) => {
    console.log(product);
    if (this.props.auth.isAuthenticated) {
      const reqBody = {
        user: this.props.auth.user.id,
        productID: product._id,
        productName: product.title,
        productPrice: product.price,
        quantity: 1
      }
      await axios.post('/api/cart', reqBody);
      this.setState({ showCartAlert: true });
    }
    else
      this.props.history.push("/login");
  }

  closeAlertCart = () => {
    this.setState({ showCartAlert: false });
  }

  render() {
    //  console.log(this.state.products)
    return (
      <div class="videoBack">

        <div class="container mt-5">
        {(this.state.showCartAlert ?
          (<Alert variant="success" onClose={() => this.closeAlertCart()} dismissible>Added to Cart!  <Link type="Button" to="/cart">View Cart</Link></Alert>)
          : '')}
          <div className="row">
            {this.state.products.map((p, i) => (
              <div className="col-sm-4 product">

                <Card>
                  <Link to={{ pathname: "/product", state: { p: p } }} className="link">
                    <Card.Img className="imgTop" variant="top" src={process.env.PUBLIC_URL + this.state.products[i].image1} />
                  </Link>
                  <Card.Body className="cardBody">

                    <Card.Title>{this.state.products[i].title}</Card.Title>
                    <Card.Text>
                      {this.state.products[i].desc1}<br />
                      <i>Seller:</i>{this.state.products[i].seller}
                      <b>{"$" + this.state.products[i].price}</b><br />
                    </Card.Text>
                    <Button variant="secondary" onClick={this.addToCart.bind(this, this.state.products[i])}>Add to Cart</Button>
                    {/* <Button variant="bt" data-toggle="modal" data-target="#exampleModal1">Quick View</Button>
                    <div class="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{this.state.products[i].title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            {this.state.products[i].title}<br />
                            <img src={this.state.products[i].image1} alt="Smiley face" height="320" width="320"></img><br />
                            {this.state.products[i].desc1}
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <Link to={{ pathname: "/Orders", state: { p: p } }} className="link">
                     <Button className="buy" variant="primary">Buy Now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div class="modal-body">
        </div>
      </div>
    );
  }
}
Products.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

Products.propTypes = {
  submitProducts: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { submitProducts, logoutUser }
)(Products);

//export default Products;
