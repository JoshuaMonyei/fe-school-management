import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { ProtectedRoute } from "./components/protected-route";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import NotFoundPage from "./pages/404";
import { SignUpForm } from "./pages/signup-page";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/customers";
import Account from "./pages/account";
import Settings from "./pages/settings";
import Payments from "./pages/products";
import { PublicPage } from "./pages/public-page";
import { LogoutButton } from "./components/buttons/logout-button";
import { registerChartJs } from "./utils/register-chart-js";


registerChartJs();

export const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/signup" component={SignUpForm} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/courses" component={Courses} />
      <ProtectedRoute path="/account" component={Account} />
      <ProtectedRoute path="/payments" component={Payments} />
      <ProtectedRoute path="/settings" component={Settings} />
      <Route path="/public" component={PublicPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <ProtectedRoute path="/logout" component={LogoutButton} />
      <Route path="/callback" component={CallbackPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
