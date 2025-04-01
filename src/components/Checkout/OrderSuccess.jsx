import React from "react";
const OrderSuccess = () => {
    return (
        <div className="mx-0 my-12 text-center">
          <div className="mb-5 text-5xl text-blue-600">
            <i className="ti ti-check" />
          </div>
          <div className="mb-2.5 text-2xl font-semibold">
            Đặt hàng thành công!
          </div>
          <div className="mx-auto my-0 max-w-[600px] text-stone-500">
            Cảm ơn bạn đã mua sắm tại Tech Shop. Đơn hàng của bạn đã được xác nhận
            và đang được xử lý.
          </div>
        </div>
    );
  };
  
  export default OrderSuccess;
  