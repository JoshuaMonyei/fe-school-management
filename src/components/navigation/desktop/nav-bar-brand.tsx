import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
    padding: "0px 50px",
  },
  blackText: {
    color: "#000000",
  },
  colorText: {
    color: "#635dff",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
}));

export const NavBarBrand: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="nav-bar__brand">
      <NavLink to="/" exact>
        <Toolbar className={classes.appbarWrapper}>
          <h1>
          <span className={classes.blackText}>My</span><span className={classes.colorText}>School.</span>
          </h1>
          <IconButton>
            <SchoolIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </NavLink>
    </div>
  );
};
