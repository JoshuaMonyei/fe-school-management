import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router-dom";
import { updateUser } from "src/services/dashboardService";
import { toast } from "react-toastify";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constants";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY || "");

const PaymentStatus = (props: any) => (
  <Elements stripe={stripePromise}>
    <CheckStatus {...props} />
  </Elements>
);
const CheckStatus = () => {
  const stripe = useStripe();
  const history = useHistory();
  const [message, setMessage] = useState<any>(null);
  const dispatch = useDispatch();
  const updateUserState = (user: any) =>
    dispatch({ type: "UPDATE_USER", user });

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    const accessToken = window.sessionStorage.getItem("token") || "";
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded": {
            setMessage("Success! Payment received.");
            const { data, error } = await updateUser(accessToken, user.id, {
                ...user,
                tuitionPaid: true,
            });
            if (!error) {
              updateUserState(data);
              window.sessionStorage.setItem("user", JSON.stringify(data));
              history.push("/payment-success");
              toast.success("Payment succeeded!");
            }

            break;
          }
          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            toast.success(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.");
            toast.error("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            toast.error("Something went wrong");
            break;
        }
      });
  }, [stripe]);

  return message;
};

export default PaymentStatus;
