import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col pt-3 bg-white min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <div className="text-6xl font-bold text-red-500 mb-4">403</div>
        <h1 className="text-2xl font-semibold mb-2">Truy cập bị từ chối</h1>
        <p className="text-gray-600 mb-6 text-center">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>
        <Link 
          to="/"
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Trở về trang chủ
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default UnauthorizedPage;