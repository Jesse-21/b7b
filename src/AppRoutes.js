import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { HostApolloProviderWithParams } from "./containers/apollo/HostApolloProvider";

import { Home } from "./pages/Home";
import { Dimension, withDimensionContext } from "./pages/Dimension";
import { DimensionChannel } from "./pages/DimensionChannel";
import { Post } from "./pages/Post";
import { DimensionRoutesLayout } from "./pages/layout/DimensionRoutesLayout";

const DimensionOutlet = withDimensionContext(Outlet);
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
      </Route>
      <Route
        path="d/:dimension/"
        element={
          <HostApolloProviderWithParams>
            <DimensionRoutesLayout>
              <DimensionOutlet />
            </DimensionRoutesLayout>
          </HostApolloProviderWithParams>
        }
      >
        <Route index element={<Dimension />} />
        <Route path="channels/:channelId" element={<DimensionChannel />} />
        <Route path="posts/:postId" element={<Post />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};
