import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { HostApolloProviderWithParams } from "./containers/apollo/HostApolloProvider";

import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Dimension, withDimensionContext } from "./pages/Dimension";
import { DimensionChannel } from "./pages/DimensionChannel";
import { Post } from "./pages/Post";
import { DimensionAdmin } from "./pages/DimensionAdmin";
import { DimensionRoutesLayout } from "./pages/layout/DimensionRoutesLayout";
import { withCommunityAdminContext } from "./pages/layout/DimensionAdminRoutesLayout";

import amplitude from "amplitude-js";

const DimensionOutlet = withDimensionContext(Outlet);
const DimensionAdminOutlet = withCommunityAdminContext(Outlet);

export const AppRoutes = () => {
  amplitude.getInstance().init("5b9f4ecc4ac8201a3287587d65df2091");
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
        <Route path="settings/" element={<Settings />} />
        <Route
          path="admin/"
          element={
            <>
              <DimensionAdminOutlet />
            </>
          }
        >
          <Route index element={<DimensionAdmin />} />
          <Route path="roles/:roleId" element={<DimensionAdmin />} />
        </Route>
        <Route path="channels/:channelId" element={<DimensionChannel />} />
        <Route path="posts/:postId" element={<Post />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};
