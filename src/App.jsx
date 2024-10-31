// pages
import {
  Home,
  Register,
  Login,
  ErrorPage,
  Articles,
  Profile,
  SingleProduct,
} from "./pages";

// layouts
import MainLayout from "./layouts/MainLayout";

// rrd
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// i18n
export default function App() {
  const { user } = useSelector((state) => state.user);

  const routes = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      path: "/",
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          element: <SingleProduct />,
          path: "/singleProduct/:id",
        },
        {
          element: user ? <Articles /> : <Navigate to="/" />,
          path: "/articles",
        },
        {
          element: user ? <Profile /> : <Navigate to="/" />,
          path: "/profile",
        },
      ],
    },
    {
      element: user ? <Navigate to="/" /> : <Register />,
      path: "/register",
    },
    {
      element: user ? <Navigate to="/" /> : <Login />,
      path: "/login",
    },
  ]);

  return <RouterProvider router={routes} />;
}
