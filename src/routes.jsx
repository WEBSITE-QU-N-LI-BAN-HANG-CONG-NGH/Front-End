import { Navigate, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail1";
import Cart from "./pages/Cart/Cart";
import UserAccount from "./pages/UserAccount/UserAccount";
import Review from "./pages/Review/Review";
import ContactUs from "./pages/Contact/ContactUs";
import ContactedUs from "./pages/Contact/ContactedUs";
import Catalog from "./pages/Catalog/Catalog";
import OAuthRedirect from "./pages/Auth/OAuthRedirect";
import NavigatePage from "./pages/NavigatePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <NavigatePage />,
        index: true
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { path: "homepage", element: <Home /> },
            { path: "detail/:id", element: <ProductDetail /> },
            { path: "cart", element: <Cart /> },
            { path: "information/newsletter-subscription", element: <UserAccount /> },
            { path: "information/terms", element: <Review /> },
            { path: "information/contact-us", element: <ContactUs /> },
            { path: "information/contact-us/done", element: <ContactedUs /> },
            { path: "product/all", element: <Navigate to="/product/all/1" replace /> },
            { path: "product/all/:page", element: <Catalog /> },
        ],
    },
    { path: "/oauth2/redirect", element: <OAuthRedirect /> },
]);