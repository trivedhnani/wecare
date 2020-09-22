import React from "react";
import StripeCheckout from "react-stripe-checkout";
const PaymentButton = () => {
  const publishableKey = "pk_test_GGDtzNTU71dlM3pqyjOdvsvc00hPKO7unW";
  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name=" WECARE Ltd."
      billingAddress
      shippingAddress
      description={`Your total amount is 100$`}
      amount={100 * 100}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default PaymentButton;
