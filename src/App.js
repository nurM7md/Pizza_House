import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import MenuePage from "./Pages/MenuePage";
import CheckOut from "./Pages/CheckOut";
import LayOut from "./Components/Layout/LayOut";
import { Toaster } from "react-hot-toast";
import Payment from "./Pages/Payment";
import ThankPage from "./Pages/ThankPage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/menue",
          element: <MenuePage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
         {
          path: "/thanks",
          element: <ThankPage />
        },
        
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
