import React from "react";
import { Auth0Resource } from "../models/auth0-resource";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  // const resourceList: Auth0Resource[] = [
  //   {
  //     path: "https://auth0.com/why-auth0/",
  //     label: "Why Auth0",
  //   },
  //   {
  //     path: "https://auth0.com/docs/get-started",
  //     label: "How It Works",
  //   },
  //   {
  //     path: "https://auth0.com/blog/developers/",
  //     label: "Developer Blog",
  //   },
  //   {
  //     path: "https://auth0.com/contact-us",
  //     label: "Contact an Expert",
  //   },
  // ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src="https://www.svgrepo.com/show/155976/university-outlined-hand-drawn-building.svg"
              alt="Auth0"
              width="20"
              height="22.22"
            />
            <PageFooterHyperlink path="https://auth0.com/">
              Darwin College
            </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};
