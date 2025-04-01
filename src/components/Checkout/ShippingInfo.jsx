import React from "react";

const ShippingInfo = () => {
    return (
      <div className="flex-1">
        <div className="mb-5 font-semibold">Thông tin giao hàng</div>
        <div className="p-5 rounded-lg bg-neutral-100">
          <div className="flex gap-4 mb-4">
            <i className="ti ti-map-pin" />
            <div className="flex-1">
              <div className="font-medium">Nguyễn Văn A</div>
              <div className="mt-1.5 text-sm text-stone-500">
                123 Đường Lê Lợi
              </div>
              <div className="mt-1.5 text-sm text-stone-500">
                Quận 1, TP. Hồ Chí Minh 700000
              </div>
              <div className="mt-1.5 text-sm text-stone-500">0901234567</div>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <i className="ti ti-credit-card" />
            <div className="flex-1">
              <span>Phương thức thanh toán</span>
              <div className="mt-1.5 font-medium">VN Pay</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ShippingInfo;
  