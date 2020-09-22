import React, { Component } from "react";
import './Auth.css'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../controller/authController";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    // console.log(nextProps)
    if (nextProps.errors.response) {
      this.setState({
        errors: nextProps.errors.response.data
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container allCenter">
     
      <div className="row">
     
        <div className="col s8 offset-s2">
        
          <div className="col s12" style={{  }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="subheading">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="row">
              <label className={classnames("", {
                "error": errors.email
              })}>Email *
              <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("input-line", {
                    "input-line-error": errors.email
                  })}
                /></label></div><div className="row">
              <span className="error-msg">{errors.email}</span>
            </div>
            <br /><div className="row">
              <label className={classnames("", {
                "error": errors.password
              })}>Password *
              <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("input-line", {
                    "input-line-error": errors.password
                  }, {"input-line-error": errors.errorMessage
                })}
                /></label></div><div className="row">
              <span className="error-msg">{errors.password}</span>
              <span className="error-msg">{errors.errorMessage}</span>
            </div>
            <br />
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
