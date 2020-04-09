const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("config");
const stripe = require("stripe")(config.get("STRIPE_SECRET_KEY"));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 4000;
app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };
  stripe.charges.create(body, (stripeErr, StripeRes) => {
    if (stripeErr) {
         return  res.status(500).send({error:stripeErr})
    }
    res.status(200).send({ success: StripeRes });
  });
});

app.listen(port, (err) => {
  if (err) console.log(`We got some problem in port ${port}`);
  console.log(`Go on we are up and running on port ${port}`);
});
