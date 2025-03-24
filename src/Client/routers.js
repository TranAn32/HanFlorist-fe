import { Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import CategoriesPages from "./pages/CategoriesPages";
import Layout from "./components/Layout";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Layout>
          <ProfilePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/categories/:category",
    element: (
      <Layout>
        <CategoriesPages />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Layout>
          <CartPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Layout>
          <CheckoutPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
      <ProtectedRoute>
        <Layout>
          <ChangePasswordPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "",
    element: <Navigate to="/" replace />,
  },
];

export default routes;