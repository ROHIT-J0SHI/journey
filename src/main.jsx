import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CreateTrip from "./components/create-trip/CreateTrip";
import Layout from "./Layout.jsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./components/view-trip/[tripId]/Viewtrip.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import ContactUs from "./components/custom/ContactUs.jsx";

// Initialize AOS
AOS.init();

// Define the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the root element
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create-trip",
        element: <CreateTrip />,
      },
      {
        path: "/view-trip/:tripId",
        element: <Viewtrip/>
      },
      {
        path: "/contact",
        element: <ContactUs/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
