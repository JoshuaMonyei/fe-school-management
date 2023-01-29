import React from "react";
import { ToastContainer } from "react-toastify";
import { NavBar } from "./navigation/desktop/nav-bar";
import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";
import { PageFooter } from "./page-footer";
import "react-toastify/dist/ReactToastify.css";

interface PageLayoutProps {
  children?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <MobileNavBar />
      <ToastContainer />
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};
