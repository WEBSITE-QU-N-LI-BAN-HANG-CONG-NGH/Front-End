# 🚀 Dự án Website Bán Hàng Công Nghệ - Tech Shop

Đây là dự án frontend cho một website thương mại điện tử chuyên bán các sản phẩm công nghệ. Dự án được xây dựng bằng **ReactJS** và **Vite**, tập trung vào việc tạo ra trải nghiệm người dùng hiện đại, nhanh chóng và mượt mà.

## ✨ Giới thiệu

Trang web cho phép người dùng xem, tìm kiếm, lọc sản phẩm, quản lý giỏ hàng, đặt hàng và theo dõi đơn hàng của mình. Hệ thống cũng tích hợp xác thực người dùng qua email/mật khẩu và OAuth2 (Google, GitHub), cùng với một chatbot AI (Gemini) để hỗ trợ khách hàng.

## 🛠️ Công nghệ sử dụng

Dự án được xây dựng với các công nghệ hiện đại và phổ biến trong hệ sinh thái JavaScript:

* **Framework/Thư viện chính:**
    * [**React 19**](https://react.dev/): Thư viện giao diện người dùng mạnh mẽ.
    * [**Vite**](https://vitejs.dev/): Công cụ build thế hệ mới, cho trải nghiệm phát triển cực nhanh.
    * [**React Router v7**](https://reactrouter.com/): Xử lý routing và điều hướng trang.
* **Quản lý State:**
    * **React Context API:** Sử dụng để quản lý state toàn cục cho các chức năng như `AuthContext`, `CartContext`, `OrderContext`, và `ToastContext`.
* **Styling:**
    * [**Tailwind CSS**](https://tailwindcss.com/): Framework CSS theo hướng utility-first để xây dựng giao diện nhanh chóng và nhất quán.
    * [**Material-UI (MUI)**](https://mui.com/) & [**Headless UI**](https://headlessui.com/): Dùng cho các component giao diện phức tạp như Modals, Menus, Alerts để đảm bảo tính tiện dụng và khả năng truy cập.
* **Giao tiếp với Backend:**
    * [**Axios**](https://axios-http.com/): Thư viện HTTP client để thực hiện các yêu cầu API đến backend.
    * **API Interceptors:** Tự động đính kèm JWT và xử lý làm mới token (refresh token) khi hết hạn.
* **Form:**
    * [**React Hook Form**](https://react-hook-form.com/): Quản lý trạng thái form hiệu quả.
    * [**Zod**](https://zod.dev/): Dùng để xác thực schema cho dữ liệu form.
* **Khác:**
    * **ESLint:** Đảm bảo chất lượng và tính nhất quán của mã nguồn.
    * **Heroicons**, **React Icons**: Thư viện icon.

## 🚀 Hướng dẫn cài đặt và khởi chạy

### Yêu cầu hệ thống

* [Node.js](https://nodejs.org/) (phiên bản v18.x trở lên được khuyến nghị)
* npm hoặc yarn

### Các bước cài đặt

1.  **Clone repository về máy và di chuyển vào thư mục dự án:**
    ```bash
    git clone https://github.com/WEBSITE-QU-N-LI-BAN-HANG-CONG-NGH/FrontEnd-Customer
    cd FrontEnd-Customer
    ```


2.  **Cài đặt các dependencies:**
    ```bash
    npm install
    ```
    *(Hoặc `yarn install` nếu bạn dùng Yarn)*


3.  **Chạy dự án ở chế độ development:**
    ```bash
    npm run dev
    ```
    Dự án sẽ khởi động và có thể truy cập tại `http://localhost:5173` (hoặc một cổng khác nếu cổng 5173 đã được sử dụng).

### Các câu lệnh khác

* **Build dự án cho production:**
    ```bash
    npm run build
    ```
    Các file tĩnh sẽ được tạo ra trong thư mục `dist`.

* **Xem trước bản build production:**
    ```bash
    npm run preview
    ```

* **Kiểm tra lỗi mã nguồn (lint):**
    ```bash
    npm run lint
    ```

## 📁 Cấu trúc thư mục

Dự án được tổ chức theo cấu trúc module, giúp dễ dàng quản lý và mở rộng:

```
src/
├── assets/         # Chứa hình ảnh, fonts, và các file CSS toàn cục
├── components/     # Chứa các component giao diện tái sử dụng
│   ├── common/     # Các component chung (Button, Input, Modal...)
│   ├── features/   # Các component lớn, gắn với một tính năng cụ thể (cart, product, user...)
│   └── layout/     # Các component cấu trúc layout (Header, Footer, Sidebar...)
├── config/         # Cấu hình cho các thư viện (ví dụ: axios interceptors)
├── contexts/       # Các React Context để quản lý state (Auth, Cart, Order...)
├── hooks/          # Các custom hook để tái sử dụng logic
├── pages/          # Mỗi thư mục con là một trang của ứng dụng (Home, Cart, ProductDetail...)
├── Routers/        # Định nghĩa các route cho ứng dụng
├── services/       # Các file chứa logic gọi API đến backend
└── main.jsx        # File khởi tạo và render ứng dụng React
```

## 🌟 Tính năng nổi bật

* **Xác thực người dùng:**
    * Đăng ký, Đăng nhập bằng Email & Mật khẩu.
    * Xác thực OTP qua email khi đăng ký.
    * Chức năng "Quên mật khẩu".
    * Đăng nhập nhanh qua **Google** và **GitHub** (OAuth2).
    * Phân quyền người dùng (customer và seller), tự động chuyển hướng seller sang trang quản trị riêng.
* **Quản lý sản phẩm:**
    * Hiển thị danh mục sản phẩm đa cấp (ví dụ: Laptop -> Asus, Dell,...).
    * Trang chi tiết sản phẩm với thư viện ảnh, thông tin, thông số kỹ thuật.
    * Hệ thống đánh giá và xếp hạng sản phẩm.
* **Bộ lọc và Tìm kiếm:**
    * Thanh tìm kiếm sản phẩm theo từ khóa.
    * Hệ thống lọc sản phẩm nâng cao theo danh mục con, khoảng giá, màu sắc.
    * Sắp xếp sản phẩm theo giá, mức độ giảm giá, sản phẩm mới nhất.
* **Giỏ hàng & Thanh toán:**
    * Thêm, xóa, cập nhật số lượng sản phẩm trong giỏ hàng.
    * Quy trình thanh toán (Checkout) nhiều bước:
        1.  Xem lại giỏ hàng.
        2.  Chọn hoặc thêm địa chỉ giao hàng mới (tích hợp API tỉnh/thành Việt Nam).
        3.  Chọn phương thức thanh toán (COD, VNPAY).
        4.  Hoàn tất và xác nhận đơn hàng.
* **Quản lý tài khoản người dùng:**
    * Cập nhật thông tin cá nhân.
    * Xem lịch sử và trạng thái các đơn hàng đã đặt.
    * Xem chi tiết từng đơn hàng.
* **Tích hợp AI:**
    * **Chatbot** hỗ trợ khách hàng, được cung cấp bởi **Google Gemini API** thông qua một backend Flask riêng.

---

