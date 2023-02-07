/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { CurrentSession } from "../components/dashboard/current-session";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { Department } from "../components/dashboard/department";
import { Programme } from "../components/dashboard/programme";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { PageLoader } from "../components/page-loader";
import { Helmet } from "react-helmet";

const Page: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CurrentSession />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Department />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TasksProgress />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Programme />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByDevice />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <LatestProducts />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <LatestOrders />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
};
export default Page;
