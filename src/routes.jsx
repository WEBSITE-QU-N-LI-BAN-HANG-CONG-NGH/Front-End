import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home/Home";
import Laptops from "./components/features/product/Laptops"; // Tạo file này nếu chưa có
import Desktops from "./components/features/product/Desktops";
import Phones from "./components/features/product/Phones"; // Tạo file này nếu chưa có
import Accessories from "./components/features/product/Accessories"; // Tạo file này nếu chưa có
import ComputerParts from "./components/features/product/ComputerParts"; // Tạo file này nếu chưa có
import OtherProducts from "./components/features/product/OtherProducts"; // Tạo file này nếu chưa có
import OurDeals from "./components/features/product/OurDeals"; // Tạo file này nếu chưa có

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "laptops", element: <Laptops /> },
      { path: "desktop-computers", element: <Desktops /> },
      { path: "phones", element: <Phones /> },
      { path: "accessories", element: <Accessories /> },
      { path: "computer-parts", element: <ComputerParts /> },
      { path: "other-products", element: <OtherProducts /> },
      { path: "our-deals", element: <OurDeals /> },
      // Thêm các routes khác khi cần
    ]
  }
]);