import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Page = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" color="textPrimary" variant="h1">
            Payment Successful!
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Hooray, you have completed your payment
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <img
              alt="payment successful"
              src="/static/images/payment-success.png"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
          <NavLink to="/payments">
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Go back to payments
            </Button>
          </NavLink>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
