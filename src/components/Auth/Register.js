import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './Auth.css';
import { Alert } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, sendMail } from "../../controller/authController";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      phone: "",
      address: "",
      zip: "",
      isErr:false,
      onSuccess:false,
      errors: {},
      errorMessage:""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      const mData = {
        name: this.state.name,
        email: this.state.email
      };
      this.props.sendMail(mData);
      this.setState({onSuccess:true});  
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if (nextProps.errors) {
      this.setState({ isErr:true,
        errorMessage:  nextProps.errors.errorMessage
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      phone: this.state.phone,
      address: this.state.address,
      zip: this.state.zip,
    };
   
   
    this.props.registerUser(newUser, this.props.history);
  };
  closeErrAlertCart = () => {
    this.setState({ isErr: false });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>{(this.state.isErr ?
        (<Alert variant="danger" onClose={() => this.closeErrAlertCart()} dismissible>{this.state.errors.errorMessage}</Alert>)
        : '')}
        {(this.state.onSuccess ?
          (<Alert variant="success" onClose={() => this.closeAlertCart()} dismissible> Success! <Link to="/login">Login</Link> to continue</Alert>)
          : '')}
      <div className="container allCenter">
     
        <div className="row">
       
          <div className="col s8 offset-s2">
          
            <div className="col s12" style={{  }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="subheading">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="row">
                <label className={classnames("", {
                  "error": errors.name
                })}>Name *
                <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("input-line", {
                      "input-line-error": errors.name
                    })}
                  /></label> </div>
              <div className="row">
                <span className="error-msg">{errors.name}</span>
              </div>
              <br /><div className="row">
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
                    })}
                  /></label></div><div className="row">
                <span className="error-msg">{errors.password}</span>
              </div>
              <br /><div className="row">
                <label className={classnames("", {
                  "error": errors.password
                })}>Confirm Password *
                <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("input-line", {
                      "input-line-error": errors.password2
                    })}
                  /></label></div><div className="row">
                <span className="error-msg">{errors.password2}</span>
              </div>
              <br /><div className="row">
                <label className={classnames("", {
                  "error": errors.phone
                })}>Phone *
                <input
                    onChange={this.onChange}
                    value={this.state.phone}
                    error={errors.phone}
                    id="phone"
                    type="phone"
                    className={classnames("input-line", {
                      "input-line-error": errors.phone
                    })}
                  /></label>
              </div><div className="row">
                <span className="error-msg">{errors.phone}</span>
              </div>
              <br /><div className="row">
                <label className={classnames("", {
                  "error": errors.address
                })}>Address *
                <input
                    onChange={this.onChange}
                    value={this.state.address}
                    error={errors.address}
                    id="address"
                    type="text"
                    className={classnames("input-line", {
                      "input-line-error": errors.address
                    })}
                  /></label></div><div className="row">
                <span className="error-msg">{errors.address}</span>
              </div>
              <br /><div className="row">
                <label className={classnames("", {
                  "error": errors.zip
                })}>Zip Code *
                <input
                    onChange={this.onChange}
                    value={this.state.zip}
                    error={errors.zip}
                    id="zip"
                    type="text"
                    className={classnames("input-line", {
                      "input-line-error": errors.zip
                    })}
                  /></label></div><div className="row">
                <span className="error-msg">{errors.zip}</span>
              </div>
              <div className="col s12" style={{  paddingTop:"1rem"}}>
                <button
                  style={{
                    marginLeft: "16rem"
                  }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div></div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, sendMail }
)(withRouter(Register));
