import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { Home } from "./pages/Home";
import { Dimension } from "./pages/Dimension";

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
        <Route path="d/:domain" element={<Dimension />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};
