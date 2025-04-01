import React from "react";
const ProductInfo = () => {
  return (
    <div className="flex flex-col flex-1">
      <h1 className="mb-5 text-2xl">Laptop Acer Swift X14 SFX14 72G 79UW</h1>
      <p className="mb-5 text-2xl text-blue-600">52.990.000đ</p>
      <button className="px-8 py-4 mb-5 w-full text-base text-white bg-rose-600 cursor-pointer border-[none]">
        <span>MUA NGAY</span>
        <p className="mt-1.5 text-sm">Giao tận nơi hoặc nhận tại cửa hàng</p>
      </button>
      <section className="mb-10">
        <p className="mb-2.5 text-sm">Bảo hành 24 tháng</p>
        <p className="mb-2.5 text-sm">Đổi trả dễ dàng trong 7 ngày</p>
        <p className="mb-2.5 text-sm">Miễn phí giao hàng toàn quốc</p>
      </section>
      <section className="mb-10">
        <h2>Thông tin sản phẩm</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                CPU
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Intel® Core™ i7-12700H (14 Cores/20 Threads, up to 4.7GHz,
                24MB Cache)
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                RAM
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                32GB LPDDR5 Onboard 6400MHz
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Ổ cứng
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                1TB PCIe NVMe SSD (2242) (2slots)
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Card đồ họa
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                NVIDIA® GeForce RTX™ 4050 with 6GB GDDR6 VRAM
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Màn hình
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                14.5" 2.8K WQXGA+ (2880x1800) OLED 120Hz, 100% DCI-P3
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <button className="box-border relative shrink-0 px-6 py-4 mt-5 ml-auto text-center rounded appearance-none cursor-pointer bg-[black] text-[white]">
        Chi tiết &gt;
      </button>
    </div>
  );
};

export default ProductInfo;
