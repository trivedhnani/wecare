import React from "react";
import axios from "axios";
import "./Doctors.css";
import { Alert, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Doctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
    };

    this.getDoctorsData();
  }

  getDoctorsData() {
    // axios
    //     .get("/api/productsData/submitProducts").then((response) => {
    //         this.setState({ products: response.data })
    //     });
  }

  render() {
    //  console.log(this.state.products)
    return (
      <div class="videoBack">
        <div class="container mt-5">
          <div className="browse_row row">
            <div className="browse_list col-sm-12">
              <i className="fa fa-stethoscope browse_icon"></i>
              <div className="browse_heading">Browse By Speciality</div>
              <div className="seperator_line"></div>
              <div className="row">
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
              </div>
              <div className="view_all">View All ></div>
            </div>
            <div className="browse_list col-sm-12">
              <i className="fa fa-heartbeat browse_icon"></i>
              <div className="browse_heading">Browse By Condition</div>
              <div className="seperator_line"></div>
              <div className="row">
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
              </div>

              <div className="view_all">View All ></div>
            </div>
            <div className="browse_list col-sm-12">
              <i className="fa fa-user-md browse_icon"></i>
              <div className="browse_heading">Browse By Procedure</div>
              <div className="seperator_line"></div>
              <div className="row">
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
                <div className="browse_item col-sm-4">Dentist</div>
              </div>
              <div className="view_all">View All ></div>
            </div>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>
    );
  }
}

export default Doctors;
