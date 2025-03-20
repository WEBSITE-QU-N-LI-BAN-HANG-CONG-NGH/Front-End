import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-black max-md:max-w-full">
      <div className="flex flex-col items-center pt-7 pr-20 pb-14 pl-6 w-full bg-black max-md:px-5 max-md:max-w-full">
        <div className="flex gap-10 items-start self-stretch w-full text-sm font-light leading-5 text-white max-w-[1766px] max-md:max-w-full">
          <div className="text-xl leading-7">
            <span style={{ fontWeight: 700 }}>Information</span>
            <br />
            <br />
            About Us
            <br />
            Privacy Policy
            <br />
            Contact Us
          </div>
          <div className="text-xl leading-7">
            <span style={{ fontWeight: 700 }}>Linh kiện</span>
            <br />
            <br />
            CPU
            <br />
            Ổ cứng
            <br />
            Card đồ họa
            <br />
            Vỏ case/ Nguồn
            <br />
            RAM
            <br />
            Tai nghe / Loa
            <br />
            Bàn phím / Chuột
          </div>
          <div className="text-xl leading-7">
            <span
              style={{ fontWeight: 700, fontSize: "20px", lineHeight: "20px" }}
            >
              Máy tính bàn
            </span>
            <br />
            <br />
            Custom PC
            <br />
            MSI All-In-One PC
            <br />
            HP/Compaq PC
            <br />
            AUS PC
            <br />
            Tecs PC
          </div>
          <div className="text-xl leading-7">
            <span
              style={{ fontWeight: 700, fontSize: "20px", lineHeight: "20px" }}
            >
              Điện thoại
            </span>
            <br />
            <br />
            iPhone series
            <br />
            Oppo
            <br />
            Xiaomi
            <br />
            Samsung
            <br />
            Vivo
            <br />
            Gaming phone
          </div>
          <div className="text-xl leading-7">
            <span
              style={{ fontWeight: 700, fontSize: "20px", lineHeight: "20px" }}
            >
              Laptops
            </span>
            <br />
            <br />
            Acer
            <br />
            Asus
            <br />
            Dell
            <br />
            HP
            <br />
            MSI
            <br />
            Lenovo
            <br />
            Macbook
          </div>
          <div className="text-xl leading-7">
            <span style={{ fontWeight: 700 }}>Phụ kiện</span>
            <br />
            <br />
            Tai nghe không dây
            <br />
            Cáp sạc
            <br />
            Sạc dự phòng
            <br />
            Ốp lưng
            <br />
            Kính cường lực
            <br />
            <br />
          </div>
          <div className="grow shrink self-stretch my-auto w-[289px]">
            <span style={{ fontWeight: 700, lineHeight: "14px" }}>Address</span>
            <br />
            <br />
            <span style={{ fontSize: "13px", lineHeight: "18px" }}>
              Address: 97 Man Thiện, Thủ Đức, TP. Hồ Chí Minh
            </span>
            <br />
            <span style={{ fontSize: "13px", lineHeight: "18px" }}>
              Phones:{" "}
            </span>
            <span
              style={{
                fontSize: "13px",
                lineHeight: "18px",
                color: "rgba(1,164,255,1)",
              }}
            >
              (00) 1234 5678
            </span>
            <br />
            <span style={{ fontSize: "13px", lineHeight: "18px" }}>
              E-mail:{" "}
            </span>
            <span
              style={{
                fontSize: "13px",
                lineHeight: "18px",
                color: "rgba(1,164,255,1)",
              }}
            >
              shop@email.com
            </span>
          </div>
        </div>
        <div className="flex shrink-0 mt-14 max-w-full h-px bg-white w-[1399px] max-md:mt-10" />
        <div className="flex flex-wrap gap-10 items-start mt-9 w-full max-w-[1360px] max-md:max-w-full">
          <div className="flex gap-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7eaf15ad065f02a75e064fbf83d2bce88fe5991e4ee6764dbab8ab078e6ce3fd?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
              className="object-contain shrink-0 aspect-[1.06] w-[17px]"
              alt="Social icon 1"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ec743cd8330c4809fa86f9e7e25a11d25425f1be05949b9a7f50e773e7e41c9?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
              className="object-contain shrink-0 aspect-[1.06] w-[17px]"
              alt="Social icon 2"
            />
          </div>
          <div className="flex flex-wrap flex-auto gap-10 items-start text-xs font-medium leading-none text-right text-white max-md:max-w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8cd0f30c81b8850333ac1045f35baf338e9b10dd4ae62ebbe115e60f64caede4?placeholderIfAbsent=true&apiKey=baf90292c2ac43deb38a7173acaae088"
              className="object-contain shrink-0 mt-2 aspect-[2] w-[66px]"
              alt="Payment methods"
            />
            <div>Copyright © 2025 Shop Pty. Ltd.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
