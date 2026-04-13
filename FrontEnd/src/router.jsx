import { createBrowserRouter } from "react-router-dom";
import Register from "./modules/signInOut/components/register/Register";
import Login from "./modules/signInOut/components/login/Login";
import Dashboard from "./modules/dashboard/components/dashboard/Dashboard";
import { routes } from "./modules/dashboard/routes";
import ProblemStatement from "./modules/Problem/ProblemStatement/ProblemStatement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    lazy: async () => {
      const module =
        await import("./modules/dashboard/components/dashboard/Dashboard");
      return { Component: module.default };
    },
    element: <Dashboard />,
    children: routes,
  },

  // {
  //   path: "/problem/:id",
  //   element: <ProblemStatement />,
  // },
]);

// {
//       path: "/dashboard",
//       element: (
//         <Suspense fallback={<h1>Loading lazy component.........</h1>}>
//           <dashboardComp />
//         </Suspense>
//       ),
// },

////////////////////////////////////
// {
//   path: "lazy",
//   lazy: async () => {
//     const module = await import("./modules/signInOut/routes");
//     return { routes: module.signInOutRoutes };
//   },
// },
