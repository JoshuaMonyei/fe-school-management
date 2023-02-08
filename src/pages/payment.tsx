import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@mui/material";
import TuitionPayment from "../components/payment/payment-intent";
import PaymentToolbar from "../components/payment/payment-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Page: React.FC = () => {
  const [department, setDepartment] = useState<any>("");

  useEffect(() => {
    const asyncCallback = async () => {
      const department = window.sessionStorage.getItem("department") || "";
      setDepartment(department);
    };
    asyncCallback();
  }, []);
  return (
    <>
      <DashboardLayout>
        <Helmet>
          <title>Payments</title>
        </Helmet>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container>
            <PaymentToolbar department={department} />
            <Box sx={{ mt: 3 }}>
              <TuitionPayment />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};

export default Page;
