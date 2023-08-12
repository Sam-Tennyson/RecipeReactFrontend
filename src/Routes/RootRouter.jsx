// components
import PrivateLayout from "../Components/Layouts/PrivateLayout";
import PublicLayout  from "../Components/Layouts/PublicLayout";
import AppLayout from "../Components/Layouts/AppLayout";
import { PrivateRoute } from "./PrivateRoute";
import {PublicRoute} from './PublicRoute'

// libs
import { BrowserRouter, Navigate, useRoutes} from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

// actions
import { updateAuthToken } from "../Shared/Axios";

// constants
import { ROUTE_CONSTANTS } from "../Shared/Routes";
import { AuthRoutes } from "./AuthRoutes";

const DEFAULT_AUTHENTICATED_ROUTE = ROUTE_CONSTANTS.DASHBOARD;
const DEFAULT_GUEST_ROUTE = ROUTE_CONSTANTS.DASHBOARD;

const GuestRoutes = () => {
  const routes = AuthRoutes.concat(PublicRoute);
  let defaultGuestRoute = {
    path: "*",
    element: <Navigate to={DEFAULT_GUEST_ROUTE} replace />,
    title: "Home",
  };
  routes.push(defaultGuestRoute);
  const routing = useRoutes(routes);
  return <PublicLayout>{routing}</PublicLayout>;
};

const AuthenticatedRoutes = () => {
  const routes = PublicRoute.concat(PrivateRoute);
  let defaultRoute = {
    path: "*",
    element: <Navigate to={DEFAULT_AUTHENTICATED_ROUTE} replace />,
    title: "Home",
  };
  routes.push(defaultRoute);
  const routing = useRoutes(routes);
  return <PrivateLayout>{routing}</PrivateLayout>;
};

const RootRouter = () => {
  const token = useSelector((state) => state.auth.token);
  updateAuthToken(token);
  const isAuthenticated = !!token;

  return (
    <BrowserRouter basename={""}>
      <AppLayout isAuthenticated={isAuthenticated}>
        {token ? <AuthenticatedRoutes />: <GuestRoutes />}
      </AppLayout>
    </BrowserRouter>
  );
};

export default RootRouter;

