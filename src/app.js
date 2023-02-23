import React from "react";
import ReactDom from "react-dom/client";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "/index.css";
import About from "./About";
import Error from "./Error";
import Contact from "./Contact";
import RestaurantMenu from "./RestaurantMenu";


const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      {/* Outlet*/}
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },

    ]
  },


]);


const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
