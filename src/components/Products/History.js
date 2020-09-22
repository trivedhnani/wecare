import React from 'react';
import './Orders.css';
import axios from "axios";
import * as numeral from 'numeral';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../controller/authController";

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            orderExists: false
        }
        this.getOrders()
    }

    getOrders() {
        axios
            .get("/api/order?id=" + this.props.auth.user.id).then((response) => {
                this.setState({ products: response.data, orderExists: true })
                console.log(response.data)
            });
    }

    render() {
        return (
            <div className="prevOrders">
                <h1>Your Orders</h1>
                <div className="cart">

                    <div className="cart-items">
                        {this.state.orderExists ?
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.products.map((p) => {
                                        return (
                                            p.items.map((i) => {
                                                return (
                                                    <tr key={i.productName} >
                                                        <td></td>
                                                        <td>{i.productName}</td>
                                                        <td>{numeral(i.productPrice).format('$0,0.00')}</td>
                                                        <td>{i.quantity}</td>
                                                        <td>{numeral(i.productPrice * i.quantity).format('$0,0.00')}</td>
                                                        <td>{p.dateCreated}</td>
                                                    </tr>
                                                );
                                            })
                                        )
                                    })}
                                </tbody>
                            </table> :
                            <h1>No Orders to show.</h1>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

History.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(History);

//export default History;