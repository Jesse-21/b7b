import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { HostApolloProviderWithParams } from "./containers/apollo/HostApolloProvider";

import { Home } from "./pages/Home";
import { Dimension } from "./pages/Dimension";
import { DimensionChannel } from "./pages/DimensionChannel";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            Layout!
            {/* the child of the root layout */}
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="d/:dimension"
          element={
            <HostApolloProviderWithParams>
              <Dimension />
            </HostApolloProviderWithParams>
          }
        />
        <Route
          path="d/:dimension/channels/:channelId"
          element={
            <HostApolloProviderWithParams>
              <DimensionChannel />
            </HostApolloProviderWithParams>
          }
        />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};
