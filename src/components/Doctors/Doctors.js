import React from "react";
import axios from "axios";
import "./Doctors.css";
import { Alert, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import queryString from "query-string";
import * as numeral from "numeral";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../controller/authController";

class Doctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      show: false,
      selectedDoctor: {
        name: "",
        speciality: "",
        price: 0,
        id: "",
      },
      date: "",
      time: "",
      consultationReason: "",
    };

    this.getDoctorsData();
    this.makeConsultation = this.makeConsultation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values.speciality);
    const speciality = values.speciality;
    axios.get(`/api/doctors?speciality=${speciality}`).then((response) => {
      console.log(response);
      this.setState({ doctors: response.data });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  makeConsultation() {
    const formDate = new Date(this.state.date);
    const formDoctor = this.state.selectedDoctor._id;
    const formDoctorName = this.state.selectedDoctor.name;
    const formUser = this.props.auth.user.id;
    const formUserName = this.props.auth.user.name;
    const formTime = this.state.time;
    const formReason = this.state.consultationReason;
    const formPrice = this.state.selectedDoctor.price;
    axios
      .post("/api/doctors/consult", {
        date: formDate,
        doctorId: formDoctor,
        userId: formUser,
        doctorName: formDoctorName,
        price: formPrice,
        userName: formUserName,
        time: formTime,
        reason: formReason,
      })
      .then((res) => {
        if (res.status == 200) {
          this.setState({ show: false });
        }
      });
  }

  getDoctorsData() {
    const values = queryString.parse(this.props.location.search);
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
          <div className="row">
            {this.state.doctors.map((p, i) => (
              <div key={p.id} className="col-sm-4 product">
                <Card>
                  <Card.Img
                    className="imgTop"
                    variant="top"
                    src={process.env.PUBLIC_URL + "doctor.jpg"}
                  />
                  <Card.Body className="cardBody">
                    <Card.Title>{this.state.doctors[i].name}</Card.Title>
                    <Card.Text>
                      {this.state.doctors[i].description}
                      <br />
                      <i>Speciality:</i>
                      {this.state.doctors[i].speciality}
                      <br />
                      <strong>{"$" + this.state.doctors[i].price}</strong>
                    </Card.Text>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        this.setState({
                          show: true,
                          selectedDoctor: this.state.doctors[i],
                        });
                      }}
                    >
                      Consult
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <Modal
          onHide={() => {
            this.setState({ show: false });
          }}
          show={this.state.show}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Consult {this.state.selectedDoctor.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>Date :</label>
              <input
                name="date"
                type="date"
                checked={this.state.date}
                onChange={this.handleInputChange}
              />
              <br />
              <br />
              <label>Time:</label>
              <input
                name="time"
                type="time"
                value={this.state.time}
                onChange={this.handleInputChange}
              />
              <br />
              <br />
              <label>Reason to Consult:</label>
              <input
                name="consultationReason"
                type="textarea"
                value={this.state.consultationReason}
                onChange={this.handleInputChange}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.makeConsultation}>
              Book Consultation Time
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Doctors.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Doctors);
