import { type RouteObject, Navigate } from "react-router";
import { AuthLayout } from "@features/auth/layouts/AuthLayout";
import { Login } from "@features/auth/pages/Login";
import { SignUp } from "@features/auth/pages/SignUp";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="log-in" replace />,
      },
      {
        path: "log-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];
