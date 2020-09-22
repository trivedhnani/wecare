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
                <Link
                  to="/describe?category=dentist"
                  className="browse_item col-sm-6 browse_link"
                >
                  Dentist
                </Link>
                <Link
                  to="/describe?category=dermatologist"
                  className="browse_item col-sm-6 browse_link"
                >
                  Dermatologist
                </Link>
                <Link
                  to="/describe?category=endocrinologist"
                  className="browse_item col-sm-6 browse_link"
                >
                  Endocrinologist
                </Link>
                <Link
                  to="/describe?category=gastroenterologist"
                  className="browse_item col-sm-6 browse_link"
                >
                  Gastroenterologist
                </Link>
              </div>
            </div>
            <div className="browse_list col-sm-12">
              <i className="fa fa-heartbeat browse_icon"></i>
              <div className="browse_heading">Browse By Condition</div>
              <div className="seperator_line"></div>
              <div className="row">
                <Link
                  to="/describe?category=acid reflux"
                  className="browse_item col-sm-6 browse_link"
                >
                  Acid Reflux
                </Link>
                <Link
                  to="/describe?category=high blood pressure"
                  className="browse_item col-sm-6 browse_link"
                >
                  High Blood Pressure
                </Link>
                <Link
                  to="/describe?category=diabates"
                  className="browse_item col-sm-6 browse_link"
                >
                  Diabates
                </Link>
                <Link
                  to="/describe?category=osteoarthritis "
                  className="browse_item col-sm-6 browse_link"
                >
                  Osteoarthritis
                </Link>
              </div>
            </div>
            <div className="browse_list col-sm-12">
              <i className="fa fa-user-md browse_icon"></i>
              <div className="browse_heading">Browse By Procedure</div>
              <div className="seperator_line"></div>
              <div className="row">
                <Link
                  to="/describe?category=acupuncture"
                  className="browse_item col-sm-6 browse_link"
                >
                  Acupuncture
                </Link>
                <Link
                  to="/describe?category=vasectomy"
                  className="browse_item col-sm-6 browse_link"
                >
                  Vasectomy
                </Link>
                <Link
                  to="/describe?category=colonoscopy"
                  className="browse_item col-sm-6 browse_link"
                >
                  Colonoscopy
                </Link>
                <Link
                  to="/describe?category=hysterectomy"
                  className="browse_item col-sm-6 browse_link"
                >
                  Hysterectomy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>
    );
  }
}

export default Doctors;
