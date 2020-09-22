import React from "react";
import axios from "axios";
import * as numeral from "numeral";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../controller/authController";

class Consultations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consultations: [],
    };
    this.getOrders();
  }

  getOrders() {
    axios
      .get("/api/doctors/consultations?userId=" + this.props.auth.user.id)
      .then((response) => {
        this.setState({ consultations: response.data });
      });
  }

  render() {
    return (
      <div className="prevOrders">
        <h1>Your Consultations</h1>
        <div className="cart">
          <div className="cart-items">
            {this.state.consultations.length != 0 ? (
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Doctor</th>
                    <th>Price</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.consultations.map((consultation) => {
                    return (
                      <tr key={consultation.date.toString()}>
                        <td></td>
                        <td>{consultation.doctorName}</td>
                        <td>${consultation.price}</td>
                        <td>{consultation.time}</td>
                        <td>{consultation.date.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1>No Consultations to show.</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Consultations.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Consultations);

//export default Consultations;
