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
        path="d/"
        element={
          <HostApolloProviderWithParams>
            <DimensionRoutesLayout>
              <DimensionOutlet />
            </DimensionRoutesLayout>
          </HostApolloProviderWithParams>
        }
      >
        <Route path=":dimension" element={<Dimension />} />
        <Route
          path=":dimension/channels/:channelId"
          element={<DimensionChannel />}
        />
        <Route path=":dimension/posts/:postId" element={<Post />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};
