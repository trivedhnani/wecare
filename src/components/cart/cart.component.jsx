import React from "react";
import PaymentButton from "../Payment/Payment.component";
import { Grid } from "@material-ui/core";
const Cart = () => (
  <Grid container alignItems="center" justify="center" direction="column">
    <Grid item>
      <PaymentButton />
    </Grid>
  </Grid>
);
export default Cart;
