import React from "react";
import axios from "axios";
import "./Doctors.css";
import { Link } from "react-router-dom";

class Consult extends React.Component {
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
              <div className="browse_heading">Consult a Doctor</div>
              <div className="seperator_line"></div>
              <div className="row">
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=Primary Care" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/primarycare-foreground___3vr-_.svg"
                      alt=""
                      className="consult_image rounded-circle bg-info"
                    />
                    <p>Primary Care</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=OBGYN" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/obgyn-foreground___3n8U5.svg"
                      alt=""
                      className="consult_image rounded-circle bg-warning"
                    />
                    <p>OBGYN</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=Dentist" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/dentists-foreground___1aHuD.svg"
                      alt=""
                      className="consult_image rounded-circle bg-danger"
                    />
                    <p>Dentist</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=Dermotologist" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/dermatology-foreground___2S85y.svg"
                      alt=""
                      className="consult_image rounded-circle bg-primary"
                    />
                    <p>Dermotologist</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=Psychiatrist" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/therapy-foreground___2RKbo.svg"
                      alt=""
                      className="consult_image rounded-circle bg-primary"
                    />
                    <p>Psychiatrist</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=Eye Doctor" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/optometry-foreground___CpXD2.svg"
                      alt=""
                      className="consult_image rounded-circle bg-danger"
                    />
                    <p>Eye Doctor</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link to="/doctors?speciality=ENT" className="link">
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/ent-foreground___20BiN.svg"
                      alt=""
                      className="consult_image rounded-circle bg-warning"
                    />
                    <p>ENT</p>
                  </Link>
                </div>
                <div className="browse_item col-sm-3">
                  <Link
                    to="/doctors?speciality=Gastroenterologist"
                    className="link"
                  >
                    <img
                      src="https://d1uhlocgth3qyq.cloudfront.net/gastro-foreground___3xErH.svg"
                      alt=""
                      className="consult_image rounded-circle bg-info"
                    />
                    <p>Gastroenterologist</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>
    );
  }
}

export default Consult;
