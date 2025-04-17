// src/components/layout/BreadcrumbNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  const breadcrumbMap = {
    'laptops': 'Laptops',
    'desktop-computers': 'Máy tính bàn',
    'accessories': 'Phụ kiện',
    'phones': 'Điện thoại',
    'computer-parts': 'Linh kiện máy tính',
    'other-products': 'Sản phẩm khác',
    'our-deals': 'Khuyến mãi',
    'product': 'Sản phẩm',
    'detail': 'Chi tiết sản phẩm',
    'account': 'Tài khoản',
    'cart': 'Giỏ hàng',
    'information': 'Thông tin',
    'contact-us': 'Liên hệ',
    'review': 'Đánh giá'
  };

  return (
    <nav className="self-start mt-5 mb-3 text-xs font-light text-center text-neutral-400 max-md:max-w-full">
      <Link to="/" className="text-black">
        Home
      </Link>
      
      {pathSegments.map((segment, index) => {
        // Xây dựng URL cho breadcrumb
        const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const label = breadcrumbMap[segment] || segment;
        
        return (
          <React.Fragment key={segment}>
            <span className="text-blue-600"> › </span>
            {isLast ? (
              <span className="text-gray-400">{label}</span>
            ) : (
              <Link to={url} className="text-black">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default BreadcrumbNav;