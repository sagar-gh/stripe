import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheck = ({ price=1100 }) => {
  //stripe use cent
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_OU6hcXpKN2TowBcdKJ9QSZse00OQFccagy";
  const onToken = (token) => {
    axios({
      url: "http://localhost:4000/payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((err) => {
        console.log("Payment error", err);
        // alert("There was an issue with your payment");
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Tekkon Technologies"
      billingAddress
      shippingAddress
      image="https://jobaxle.com/uploads/company/logo/c6e97f2e6531fe28471398e1675176cd.png"
      description={`Your total price is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheck;
