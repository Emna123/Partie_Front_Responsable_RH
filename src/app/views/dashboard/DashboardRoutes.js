import React from "react";

const dashboardRoutes = [
  {
    path: "/dashboard/analytics",
    component: React.lazy(() => import("./Analytics")),
  }
];

export default dashboardRoutes;
