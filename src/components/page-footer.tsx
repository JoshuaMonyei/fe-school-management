import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  const resourceList = [
    {
      path: "https://github.com/JoshuaMonyei/fe-school-management",
      label: "Student Resources",
    },
    {
      path: "https://auth0.com/docs/get-started",
      label: "How It Works",
    },
    {
      path: "mailto:monyeijosh01@gmail.com",
      label: "Contact Us",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-info__resource-list">
          {resourceList.map((resource) => (
            <div
              key={resource.path}
              className="page-footer-info__resource-list-item"
            >
              <PageFooterHyperlink path={resource.path}>
                {resource.label}
              </PageFooterHyperlink>
            </div>
          ))}
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
