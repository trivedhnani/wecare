import React from "react";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Modal } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../controller/authController";
import { logoutUser } from "../../controller/authController";
import classnames from "classnames";
import { Link } from "react-router-dom";
//import classnames from "classnames";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      email: "",
      error: "",
      showModal: false,
      show: false,
      isErr: "",
    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.handleClose();
      this.setState({ isErr: false });
    }

    if (nextProps.errors.response) {
      this.setState({
        isErr: true,
        error: nextProps.errors.response.data.errorMessage,
      });
    }
  }

  onLoginChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };
  render() {
    //const { errors } = this.state;
    console.log(this.props);
    const { user } = this.props.auth;

    return (
      <div className="a">
        <Navbar className="nav" expand="md" sticky="top">
          <Navbar.Brand className="navbarBrand" href="/">
            WE CARE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="navLink" href="/products">
                Products
              </Nav.Link>
              <Nav.Link className="navLink" href="/wallet">
                Wallet
              </Nav.Link>
              {/*<NavDropdown*/}
              {/*    title={<span className="navLink">Services</span>}*/}
              {/*    id="basic-nav-dropdown"*/}
              {/*>*/}
              {/*  <NavDropdown.Item href="/wallet">Wallet</NavDropdown.Item>*/}
              {/*  <NavDropdown.Item href="/costestimation">*/}
              {/*    Cost Estimation*/}
              {/*  </NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
              <Nav.Link className="navLink" href="/blog">
                Blog
              </Nav.Link>
              <Nav.Link className="navLink" href="/joinChat">
                Live Chat
              </Nav.Link>
              <Nav.Link className="navLink" href="/jobs">
                Jobs
              </Nav.Link>

              <NavDropdown
                title={<span className="navLink">Doctors</span>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/consult">
                  Consult Doctor
                </NavDropdown.Item>
                <NavDropdown.Item href="/browseDoctors">
                  Browse Doctor
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {this.props.auth.isAuthenticated ? (
              <NavDropdown
                title={
                  <span className="navLink">
                    Hello, {user.name.split(" ")[0]}!{" "}
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/cart">
                  <i class="fa fa-shopping-cart"></i> Items in your cart
                </NavDropdown.Item>
                <NavDropdown.Item href="/history">
                  <i class="fa fa-server"></i> Your Orders
                </NavDropdown.Item>
                <NavDropdown.Item href="/consultations">
                  <i class="fas fa-hospital"></i> Your Consultations
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.onLogoutClick}>
                  <i class="fa fa-power-off"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.handleShow}
              >
                <i className="fa fa-user userIcon"></i> Sign In
              </button>
            )}
          </Navbar.Collapse>
        </Navbar>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="login-form">
              <form onSubmit={this.onLogin}>
                <div className="text-center">
                  <i>
                    <br />
                  </i>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      onChange={this.onLoginChange}
                      value={this.state.email}
                      id="email"
                      name="email"
                      placeholder="Email"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      onChange={this.onLoginChange}
                      value={this.state.password}
                      id="password"
                      name="password"
                      placeholder="Password"
                      required="required"
                    />
                  </div>
                </div>
                {this.state.isErr ? (
                  <span className="error">{this.state.error}</span>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success btn-block login-btn"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="hint-text small">
                Don't have an account? <a href="/register">Register Now!</a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Header.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser, logoutUser })(
  withRouter(Header)
);
