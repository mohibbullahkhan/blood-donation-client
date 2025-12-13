import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register/Register";
import RequestDonation from "../pages/RequestDonation/RequestDonation";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/Profile/Profile";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests/MyDonationRequests";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllBloodDonationRequest from "../pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import PublicDonationRequests from "../pages/PublicDonationRequests/PublicDonationRequests";
import DonationRequestDetails from "../pages/PublicDonationRequests/DonationRequestDetails";
import About from "../pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        // search donor page
        path: "/request-donation",
        Component: RequestDonation,
        loader: () => fetch("/location.json").then((res) => res.json()),
      },
      {
        path: "/donation-requests",
        Component: PublicDonationRequests,
      },
      {
        path: "/donation-requests/:id",
        Component: DonationRequestDetails, // <-- Make sure to import this component
      },
      {
        path: "/about",
        Component: About,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
        loader: () => fetch("/location.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/all-users",
        Component: AllUsers,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/create-donation-request",
        Component: CreateDonationRequest,
        loader: () => fetch("/location.json").then((res) => res.json()),
      },
      {
        path: "/dashboard/my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "/dashboard/all-blood-donation-requests",
        Component: AllBloodDonationRequest,
      },
    ],
  },
]);
