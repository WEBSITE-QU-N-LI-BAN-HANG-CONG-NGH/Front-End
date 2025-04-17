import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderNumber: "",
    issueType: "",
    description: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    // Store form data in sessionStorage to access it in the ComplaintedForm component
    sessionStorage.setItem("complaintFormData", JSON.stringify(formData));
    navigate("/information/contact-us/done");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex-1">
      <div className="p-6 mb-6 bg-violet-50 rounded-lg">
        <div className="flex gap-2 items-center mb-2">
          <i className="ti ti-info-circle text-xl" />
          <span className="text-sm font-medium">Quan Trọng</span>
        </div>
        <p className="text-sm opacity-70">
          Vui lòng cung cấp thông tin chính xác để giúp chúng tôi giải quyết vấn
          đề của bạn nhanh chóng.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="orderNumber" className="text-sm font-medium">
            Mã Đơn Hàng *
          </label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="VD: ORD 123456"
            className="p-3 rounded border"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="issueType" className="text-sm font-medium">
            Loại Vấn Đề *
          </label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="p-3 rounded border"
            required
          >
            <option value="">Chọn loại vấn đề</option>
            <option value="product">Sản phẩm</option>
            <option value="delivery">Vận chuyển</option>
            <option value="service">Dịch vụ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Mô Tả Vấn Đề *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Vui lòng cung cấp chi tiết về vấn đề của bạn"
            className="p-3 rounded border h-[120px]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Tải Lên Bằng Chứng (Tùy Chọn)
          </label>
          <div className="flex justify-center items-center p-6 rounded border border-dashed">
            <div className="flex flex-col gap-2 items-center">
              <i className="ti ti-upload text-2xl" />
              <p className="text-sm opacity-70">
                Kéo và thả tập tin đây hoặc nhấp để duyệt
              </p>
              <p className="text-xs opacity-50">
                Định dạng hỗ trợ: JPG, PNG, PDF (1.5 MB)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Địa Chỉ Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email.cua.ban@example.com"
              className="p-3 rounded border"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Số Điện Thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="VD: 0912 345 678"
              className="p-3 rounded border"
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-3 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Gửi Khiếu Nại
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;