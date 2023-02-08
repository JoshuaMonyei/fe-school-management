/* eslint-disable no-constant-condition */
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import SettingsIcon from "@mui/icons-material/Settings";
import { Selector as SelectorIcon } from "../icons/selector";
import { User as UserIcon } from "../icons/user";
import { ThemeProvider } from "@mui/material/styles";
import { useAuth0 } from "@auth0/auth0-react";
import * as dashboardService from "../services/dashboardService";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { toast } from "react-toastify";
import { PageLoader } from "./page-loader";
import { NavItem } from "./nav-item";
import { theme } from "../theme";

const items = [
  {
    href: "/dashboard",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/courses",
    icon: <MenuBookIcon fontSize="small" />,
    title: "Courses",
  },
  {
    href: "/payments",
    icon: <PaymentsIcon fontSize="small" />,
    title: "Tuition and Fees",
  },
  {
    href: "/results",
    icon: <ReceiptIcon fontSize="small" />,
    title: "Results",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
  },
];

export const DashboardSidebar = (props: any) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const updateUser = (user: any) => dispatch({ type: "UPDATE_USER", user });
  const { user, getAccessTokenSilently, logout } = useAuth0();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };
  const [state, setState] = useState<any>("notLoaded");

  useEffect(() => {
    if (open) {
      onClose?.();
    }
  }, [window.location.pathname]);

  useEffect(() => {
    const asyncCallback = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await dashboardService.getUserDetails(
        accessToken,
        {
          profile: user?.profile,
        }
      );
      console.log("data dashboard", data, error);
      if (error?.message === "Request failed with status code 404") {
        setState("error");
      } else {
        window.sessionStorage.setItem("user", JSON.stringify(data));
        window.sessionStorage.setItem("token", accessToken);
        window.sessionStorage.setItem("role", data.role);
        updateUser(data);
      }
      setState(data);
    };

    asyncCallback();
  }, []);
  if (state == "error") {
    toast.info("Please complete your registration", {
      toastId: "info1",
    });
    history.push("/signup");
    // return <SignUpForm />;
  }
  if (state == "notLoaded") {
    //return some loading component(s) (or nothing to avoid flicker)
    return <PageLoader />;
  }
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NavLink to="/">
              <a>
                <img
                  height="42"
                  width="42"
                  src="https://www.svgrepo.com/show/168578/school.svg"
                  alt="schoollogo"
                />
              </a>
            </NavLink>
          </Box>
          <Box sx={{ px: 3 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Darwin College
                </Typography>
                <Typography color="#9CA3AF" variant="body2">
                  Your role :{" "}
                  {state.role == 1
                    ? "Student"
                    : state.role == 2
                    ? "Staff"
                    : "HOD"}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "#6B7280",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 3 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <NavLink to="/" onClick={handleLogout}>
            <Button
              color="secondary"
              component="a"
              endIcon={<LogoutIcon />}
              fullWidth
              sx={{ mt: 2 }}
              variant="outlined"
            >
              Logout
            </Button>
          </NavLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <ThemeProvider theme={theme}>
        <Drawer
          anchor="left"
          open
          PaperProps={{
            sx: {
              backgroundColor: "#111827",
              color: "#FFFFFF",
              width: 280,
            },
          }}
          variant="permanent"
        >
          {content}
        </Drawer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#111827",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        sx={{ zIndex: 150 }}
        variant="temporary"
      >
        {content}
      </Drawer>
    </ThemeProvider>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
