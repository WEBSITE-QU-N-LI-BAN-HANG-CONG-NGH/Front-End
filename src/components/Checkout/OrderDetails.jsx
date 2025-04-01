import React from "react";
const OrderDetails = () => {
    return (
      <div className="flex-[2] order-[info]">
        <div className="mb-2.5 font-semibold order-[header]">
          Chi tiết đơn hàng
        </div>
        <div className="mb-5 text-sm order-[date] text-stone-500">
          Đặt hàng vào lúc 14:44:16 tháng 3, 2025
        </div>
        <div className="flex flex-col gap-5 order-[items]">
          <div className="flex gap-5 items-center p-5 rounded-lg border border-solid border-zinc-100 order-[item] max-sm:flex-col max-sm:text-center">
            <img
              src="https://placehold.co/100x100/eeeeee/eeeeee"
              alt="iPhone 15 Pro Max"
              className="object-cover h-[100px] w-[100px]"
            />
            <div className="flex-1">
              <div className="mb-1.5 font-medium">iPhone 15 Pro Max</div>
              <div className="text-sm text-stone-500">SL: 1 x 29.990.000 đ</div>
            </div>
            <div className="font-semibold max-sm:mt-2.5">29.990.000 đ</div>
          </div>
          <div className="flex gap-5 items-center p-5 rounded-lg border border-solid border-zinc-100 order-[item] max-sm:flex-col max-sm:text-center">
            <img
              src="https://placehold.co/100x100/eeeeee/eeeeee"
              alt="AirPods Pro 2"
              className="object-cover h-[100px] w-[100px]"
            />
            <div className="flex-1">
              <div className="mb-1.5 font-medium">AirPods Pro 2</div>
              <div className="text-sm text-stone-500">SL: 1 x 5.990.000 đ</div>
            </div>
            <div className="font-semibold max-sm:mt-2.5">5.990.000 đ</div>
          </div>
          <div className="flex gap-5 items-center p-5 rounded-lg border border-solid border-zinc-100 order-[item] max-sm:flex-col max-sm:text-center">
            <img
              src="https://placehold.co/100x100/eeeeee/eeeeee"
              alt="Ốp lưng iPhone 15 Pro Max"
              className="object-cover h-[100px] w-[100px]"
            />
            <div className="flex-1">
              <div className="mb-1.5 font-medium">Ốp lưng iPhone 15 Pro Max</div>
              <div className="text-sm text-stone-500">SL: 2 x 590.000 đ</div>
            </div>
            <div className="font-semibold max-sm:mt-2.5">1.180.000 đ</div>
          </div>
        </div>
        <div className="pt-5 mt-8 border-t border-solid border-t-zinc-100 order-[summary]">
          <div className="flex justify-between mb-2.5">
            <div>Tạm tính</div>
            <div>37.160.000 đ</div>
          </div>
          <div className="flex justify-between mb-2.5">
            <div>Phí vận chuyển</div>
            <div>50.000 đ</div>
          </div>
          <div className="flex justify-between mb-2.5">
            <div>Thuế (10%)</div>
            <div>3.716.000 đ</div>
          </div>
          <div className="flex justify-between mb-2.5">
            <div>Tổng cộng</div>
            <div>40.926.000 đ</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderDetails;
  