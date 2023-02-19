import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { Home } from "./pages/Home";

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
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
};
