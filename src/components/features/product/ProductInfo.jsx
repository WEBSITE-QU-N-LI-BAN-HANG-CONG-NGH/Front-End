
import React, { useState, useEffect } from "react";
import { Alert, Rating } from '@mui/material'
import { Radio, RadioGroup } from '@headlessui/react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart, getCart } from "../../../State/Cart/Action";
import { useToast } from "../../../contexts/ToastContext.jsx";

// Toast Notification Component
const ToastNotification = ({ show, message, productName, productImage, onClose }) => {
  useEffect(() => {
    if (show) {
      // Tự động ẩn thông báo sau 5 giây
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-55 w-full max-w-sm z-50 animate-slide-down">
      <div className="bg-white rounded-md shadow-lg overflow-hidden border border-gray-100">
        <div className="p-4">
          <div className="text-center text-green-600 font-medium mb-2">
            {message}
          </div>
          <div className="flex items-center gap-3">
            {productImage && (
              <img src={productImage} alt={productName} className="w-12 h-12 object-cover rounded-md" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{productName}</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-500 text-white py-3 text-center cursor-pointer" onClick={() => {
          onClose();
          window.location.href = "/cart";
        }}>
          XEM GIỎ HÀNG
        </div>
      </div>
    </div>
  );
};

const ProductInfo = ({item}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showToastt, setShowToast] = useState(false);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {showToast} = useToast();
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  const handleClickToCart = () => {
    if (!selectedSize) {
      showToast("Vui lòng chọn size", "warning");
      return;
    }
    
    const cartData = {
      productId: productId,
      size: selectedSize.name,
      quantity: 1
    };
        
    dispatch(addItemToCart(cartData))
      .then(data => {
        console.log("Successfully added to cart", data);
        dispatch(getCart());
        // Hiển thị thông báo khi thêm vào giỏ hàng thành công
        setShowToast(true);
      })
      .catch(err => {
        console.error("Failed to add to cart", err);
        alert("Không thể thêm vào giỏ hàng: " + (err.message || "Lỗi không xác định"));
      });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // Basic product information object (always visible)
  const basicInfo = [
    { label: "Brand", value: item.brand || "Unknown" },
    { label: "Color", value: item.color || "Unknown" },
    { label: "Mô tả sản phẩm", value: item.description || "No description available" },
  ];

  // Extended product information object (visible when expanded)
  const extendedInfo = [
    { label: "Dung lượng pin", value: item.batteryCapacity || "N/A" },
    { label: "Loại pin", value: item.batteryTtype || "N/A" },
    { label: "Cổng kết nối", value: item.connectionPort || "N/A" },
    { label: "Kích thước", value: item.dimension || "N/A" },
    { label: "Dung lượng ram", value: item.ramCapacity || "N/A" },
    { label: "Dung lượng bộ nhớ trong", value: item.romCapacity || "N/A" },
    { label: "Kích thước màn hình", value: item.screenSize || "N/A" },
    { label: "Trọng lượng", value: item.weight || "N/A" },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Toast Notification */}
      <ToastNotification 
        show={showToastt} 
        message="Thêm vào giỏ hàng thành công" 
        productName={item.title}
        productImage={item.imageUrl || (item.images && item.images[0])}
        onClose={() => setShowToast(false)} 
      />
      
      <h1 className="mb-5 text-2xl">{item.title}</h1>

      <div className="flex gap-1.5 items-center text-xs text-gray-500 mb-1">
        <span>{item?.averageRating?.toFixed(1) || "0.0"}</span>
        <Rating value={item?.averageRating || 0} name='half-rating' readOnly precision={.5}/>
        <span> </span>
        <span> </span>
        <span>({item?.numRatings || 0}) đánh giá </span>
        <span> </span>
        <span> </span>
        <span>Đã bán ({item?.quantitySold || 0}) </span>
      </div>

      <p className="text-3xl font-semibold text-red-600">{formatCurrency(item?.discountedPrice) || "0đ"} 
        <span> </span>
        <span className="text-xl line-through text-stone-500">{formatCurrency(item?.price) || "0đ"}</span>   
        <span> </span>
        <span className="text-sm border border-red-500 p-1 r-1">-{item?.discountPercent || 0}%</span>
      </p> 

      {/* Size Selection */}
      <fieldset aria-label="Choose a size" className="mt-4">
        <legend className="text-sm font-medium text-gray-900">Size</legend>
        <RadioGroup
          value={selectedSize}
          onChange={(size) => {setSelectedSize(size)}}
          className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 mt-4"
        >
          {(item?.sizes || []).map((size) => {
            const inStock = size.quantity > 0;
            return (
              <Radio
                key={size.name}
                value={size}
                disabled={!inStock}
                className={classNames(
                  inStock
                    ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                  'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6'
                )}
              >
                <span>{size.name}</span>
                {inStock ? (
                  <span
                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500"
                  />
                ) : (
                  <span className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 size-full stroke-2 text-gray-200"
                    >
                      <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                )}
              </Radio>
            );
          })}
        </RadioGroup>
      </fieldset>

      {/* Hiển thị size đã chọn */}
      <div className="mt-2 text-sm">
        {selectedSize ? (
          <p>Size đã chọn: <strong>{selectedSize.name}</strong></p>
        ) : (
          <p className="text-gray-500">Vui lòng chọn size</p>
        )}
      </div>

      <button 
        onClick={handleClickToCart} 
        disabled={!selectedSize}
        className={`px-8 mt-5 py-4 mb-5 w-full text-base text-white cursor-pointer border-[none] ${selectedSize ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Thêm vào giỏ hàng
      </button>
      
      <section className="mb-10">
        <p className="mb-2.5 text-sm">Bảo hành 24 tháng</p>
        <p className="mb-2.5 text-sm">Đổi trả dễ dàng trong 7 ngày</p>
        <p className="mb-2.5 text-sm">Miễn phí giao hàng toàn quốc</p>
      </section>
      
      {/* Thông tin sản phẩm với nút hiển thị thêm */}
      <section className="mb-10">
        <h2 className="text-lg font-medium mb-4">Thông tin sản phẩm</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <table className="w-full text-sm">
            <tbody>
              {/* Always show basic information */}
              {basicInfo.map((info, index) => (
                info.value !== null && info.value !== "N/A" && info.value !== undefined ? (
                  <tr key={`basic-${index}`}>
                    <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100 font-medium w-1/3">
                      {info.label}
                    </td>
                    <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                      {info.value}
                    </td>
                  </tr>
                ) : null
              ))}
              
              {/* Show "Đọc tiếp bài viết" button if not expanded */}
              {!showFullSpecs && (
                <tr>
                  <td colSpan="2" className="text-center pt-3">
                    <button 
                      onClick={() => setShowFullSpecs(true)} 
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full"
                    >
                      Đọc tiếp bài viết ▼
                    </button>
                  </td>
                </tr>
              )}
              
              {/* Show extended information if expanded */}
              {showFullSpecs && extendedInfo.map((info, index) => (
                info.value !== null && info.value !== "N/A" && info.value !== undefined ? (
                  <tr key={`extended-${index}`}>
                    <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100 font-medium w-1/3">
                      {info.label}
                    </td>
                    <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                      {info.value}
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
          
          {/* Đánh giá chi tiết và hiệu năng hiển thị khi mở rộng */}
          {showFullSpecs && (
            <div className="mt-6">
              {item.detailedReview && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Đánh giá chi tiết {item.title}</h3>
                  <p className="text-gray-700">{item.detailedReview}</p>
                </div>
              )}
              
              {item.powerfulPerformance && (
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Hiệu năng của {item.title}</h3>
                  <p className="text-gray-700">{item.powerfulPerformance}</p>
                </div>
              )}
              
              {/* Show "Thu gọn" button at the bottom */}
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowFullSpecs(false)} 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full"
                >
                  Thu gọn ▲
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;