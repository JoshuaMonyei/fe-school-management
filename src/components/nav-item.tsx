import { NavLink } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";

export const NavItem = (props: any) => {
  const { href, icon, title, ...others } = props;
  // get current path
  const path = window.location.pathname;
  const active = href ? path === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0.5,
        px: 2,
      }}
      {...others}
    >
      <NavLink to={href}>
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "#D1D5DB",
            fontWeight: "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "#9CA3AF",
            },
            "&:hover": {
              backgroundColor: "rgb(16,185,129)",
            },
            "& .MuiSvgIcon-root": {
              mr: 0.5,
            },
          }}
        >
          <Box sx={{ flexGrow: 2 }}>{title}</Box>
        </Button>
      </NavLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
