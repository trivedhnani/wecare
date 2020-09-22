import React from "react";
import axios from "axios";
import "./Doctors.css";
import { Link } from "react-router-dom";
import data from "./description.json";
import queryString from "query-string";

class CategoryDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      selectedCategory: {
        description: "",
        image: "",
      },
      title: "",
    };
  }

  componentDidMount() {
    console.log(data);
    const values = queryString.parse(this.props.location.search);
    this.setState({
      selectedCategory: data[`${values.category}`],
      title: values.category.toUpperCase(),
    });
    window.scrollTo(0, 0);
  }

  render() {
    //  console.log(this.state.products)
    return (
      <div class="videoBack">
        <div class="container mt-5">
          <div className="browse_row row">
            <div className="browse_list col-sm-12">
              <div className="browse_heading">{this.state.title}</div>
              <div className="seperator_line"></div>
              {this.state.selectedCategory.image != "" ? (
                <div className="image_wrapper_doctor">
                  <img
                    className="browse_image"
                    src={"browse_images/" + this.state.selectedCategory.image}
                  />
                </div>
              ) : (
                <br />
              )}
              <br /> <br />
              <div className="browse_description row px-5">
                {this.state.selectedCategory.description1}
              </div>
              <br /> <br />
              <div className="browse_description row px-5">
                {this.state.selectedCategory.description2}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body"></div>
      </div>
    );
  }
}

export default CategoryDescription;
