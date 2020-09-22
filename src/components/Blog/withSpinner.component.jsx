import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const WithSpnner = (Component) => {
  return ({ isLoading, ...otherProps }) => {
    console.log(isLoading);
    return isLoading ? <CircularProgress /> : <Component {...otherProps} />;
  };
};
export default WithSpnner;
