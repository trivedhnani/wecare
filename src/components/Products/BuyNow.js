import React from 'react';
import './Products.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../controller/authController";

class BuyNow extends React.Component {

    render() {
        return (
            <p>hi in buy now</p>
        );
    }
}
BuyNow.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(BuyNow);
