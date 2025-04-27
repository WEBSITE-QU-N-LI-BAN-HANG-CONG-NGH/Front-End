import React, { useState, useEffect } from "react";
import { Alert, Rating } from '@mui/material'
import { Radio, RadioGroup } from '@headlessui/react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart, getCart } from "../../../State/Cart/Action";
import { useToast } from "../../../contexts/ToastContext.jsx"; // 1. Import useToast


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
  const [showToastt, setShowToast] = useState(false); // State để quản lý hiển thị toast
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {showToast} = useToast()


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // Log khi selectedSize thay đổi để debug
  useEffect(() => {
    console.log("Selected size updated:", selectedSize);
  }, [selectedSize]);

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
    
    console.log("Sending to cart:", cartData);
    
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
            <span>{item.averageRating.toFixed(1)}</span>
            <Rating value={item.averageRating || 0} name='half-rating' readOnly precision={.5}/>
            <span> </span>
            <span> </span>
            <span>({item.numRatings || 0}) đánh giá </span>
      </div>

      <p className="text-3xl font-semibold text-red-600">{formatCurrency(item.discountedPrice) || "0đ"} 
        <span> </span>
        <span className="text-xl line-through text-stone-500">{formatCurrency(item.price) || "0đ"}</span>   
        <span> </span>
        <span className="text-sm border border-red-500 p-1 r-1">-{item.discountPercent}%</span>
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
        className={`px-8 mt-5 py-4 mb-5 w-full text-base text-white cursor-pointer border-[none] ${selectedSize ? 'bg-rose-500 hover:bg-rose-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Thêm vào giỏ hàng
      </button>
      
      <section className="mb-10">
        <p className="mb-2.5 text-sm">Bảo hành 24 tháng</p>
        <p className="mb-2.5 text-sm">Đổi trả dễ dàng trong 7 ngày</p>
        <p className="mb-2.5 text-sm">Miễn phí giao hàng toàn quốc</p>
      </section>
      
      {/* Phần thông tin sản phẩm giữ nguyên */}
      <section className="mb-10">
        <h2>Thông tin sản phẩm</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Brand
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                {item.brand || "Unknown"}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Color
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                {item.color || "Unknown"}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
              Description
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                {item.description || "No description available"}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Quantity
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                {item.quantity || 1}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                Đánh giá
              </td>
              <td className="px-2 py-2.5 border-b border-solid border-b-zinc-100">
                {item.rating || 0} <span className="text-sm text-stone-500">/5</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ProductInfo;