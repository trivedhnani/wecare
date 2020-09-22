import React, { useEffect, useState } from "react";
import _ from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "./PayButton.css";
import "./test.css";
import "./StripeElement.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      margin: "18px 10px",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ UserId, success }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amountValue, setAmount] = useState("");
  const [isPaymentSuccess, setPayment] = useState(false);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisable(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("/api/charge", {
          id,
          amount: amountValue * 100,
        });
        if (data) {
          console.log(data);
          const amount = _.get(data, "confirm.amount");
          const AddAmount = await axios.post("/api/amount", {
            UserId: UserId,
            amount: amount / 100,
          });
          if (AddAmount) {
            setPayment(true);
            setButtonDisable(false);
            // document.getElementById("create-course-form").reset()
          }
        }
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isPaymentSuccess ? (
        <Alert variant="success" onClose={() => setPayment(false)} dismissible>
          Payment was successful!
        </Alert>
      ) : (
        ""
      )}
      <form
        id="create-course-form"
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto", border: "3px solid #ccc", padding: "15px 10px", marginBottom:"20px" }}
      >
        <input
          type="number"
          // value={amountValue}
          label="Enter Amount"
          onChange={handleChange}
          placeholder="Enter Amount"
        />
        <CardElement className="StripeElement" options={CARD_ELEMENT_OPTIONS} />
        <button disabled={isButtonDisabled} className="myButton" type="submit">
          Proceed to Add Money
        </button>
      </form>
    </>
  );
};

const stripePromise = loadStripe("pk_test_ar5oCwyLOUOooyclbUuSDzZ400265Lguil");

const Charge = ({ UserId }) => {
  const [status, setStatus] = React.useState("ready");
  const [availableBalance, setBalance] = useState("");
  const [args, setArgs] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/amount?id=" + UserId, {
        params: {
          UserID: UserId,
        },
      });
      setBalance(_.get(result, "data.message.amount", "0"));
    }
    fetchData();
  }, [args]);

  if (status === "success") {
    setStatus(false);
    setArgs(args + 1);
  }

  return (
    <><h2 align="center" fontFamily="arial">WALLET <br></br></h2>

      <h6 className="h6">Available Balance: ${availableBalance}</h6>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          UserId={UserId}
          success={() => {
            setStatus("success");
          }}
        />
      </Elements>
    </>
  );
};

export default Charge;
