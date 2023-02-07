import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { ProtectedRoute } from "./components/protected-route";
import { CallbackPage } from "./pages/callback-page";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/404";
import { SignUpForm } from "./pages/signup-page";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import Account from "./pages/account";
import Settings from "./pages/settings";
import Payments from "./pages/products";
import { LogoutButton } from "./components/buttons/logout-button";
import { registerChartJs } from "./utils/register-chart-js";
import { Provider } from "react-redux";
import Store from "./redux/config/configStore";

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
    <Provider store={Store}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/signup" component={SignUpForm} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/courses" component={Courses} />
      <ProtectedRoute path="/account" component={Account} />
      <ProtectedRoute path="/payments" component={Payments} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/logout" component={LogoutButton} />
      <Route path="/callback" component={CallbackPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
    </Provider>
  );
};
