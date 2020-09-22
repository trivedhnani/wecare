import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  // SET_CURRENT_USER,
  // USER_LOADING
} from "./types";

// axios.defaults.baseURL = 'http://localhost:5000';

export const submitProducts = (productsData) => (dispatch) => {
  axios
    .post("/api/productsData/submitProducts", productsData)
    .then((response) => {
      console.log(response);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const submitOrders = (ordersData) => (dispatch) => {
  axios
    .post("/api/order", ordersData)
    .then((response) => {
      console.log(response);
      console.log("hihi");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
