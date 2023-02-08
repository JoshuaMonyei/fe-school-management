import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Container,
  Paper,
  Fade,
  Modal,
} from "@mui/material";
import { tuitionPayment } from "../../services/dashboardService";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constants";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY || "");

export default function TuitionPayment() {
  const { user } = useSelector((state: any) => state.user);
  const [department, setDepartment] = useState<any>("");
  const [isTuitionPaid, setIsTuitionPaid] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const asyncCallback = async () => {
      const department = window.sessionStorage.getItem("department") || "";
      const token = window.sessionStorage.getItem("token") || "";
      setDepartment(department);
      setToken(token);
      if (user.tuitionPaid) {
        setIsTuitionPaid(true);
      }
    };

    asyncCallback();
  }, []);

  const getCurrentSession = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}/${nextYear}`;
  };
  const amount = 1000;

  const handlePayTuition = async (event: any) => {
    event.preventDefault();
    setReady(true);
    const { data, error } = await tuitionPayment(token, amount);
    if (!error) {
      setClientSecret(data.clientSecret);
      handleOpen();
    } else {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const appearance: any = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Current Session</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Tuition</TableCell>
              <TableCell align="center">Program Fees</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {getCurrentSession()}
              </TableCell>
              <TableCell align="center">{department}</TableCell>
              <TableCell align="center">$11,950</TableCell>
              <TableCell align="center">$833</TableCell>
              <TableCell align="center">$12,783</TableCell>
              <TableCell align="center">
                {!isTuitionPaid ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayTuition}
                  >
                    Pay Now
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "green", color: "white" }}
                    disabled
                  >
                    Paid
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "white",
              width: "600px",
              height: "500px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "25px 20px 80px 20px",
            }}
          >
            <button
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <div className="payment">
              {clientSecret && ready && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}
