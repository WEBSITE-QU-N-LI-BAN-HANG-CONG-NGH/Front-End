import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import AddressSelection from "../../components/checkout/AddressSelection";

const Checkout = () => {
  const navigate = useNavigate();
  // Lấy step từ query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const initialStep = parseInt(queryParams.get('step') || '1');
  const orderId = queryParams.get('orderId');
  
  const [step, setStep] = useState(initialStep);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Lấy giỏ hàng từ local storage hoặc Redux store
  const cartFromStore = useSelector(state => state.cart?.cart);
  const [cart, setCart] = useState(null);
  
  // State cho thông tin giao hàng
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    note: ""
  });
  
  // State cho phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Tải thông tin giỏ hàng từ localStorage nếu không có trong Redux
  useEffect(() => {
    if (cartFromStore) {
      setCart(cartFromStore);
    } else {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        } else {
          // Nếu không có giỏ hàng, tạo giỏ hàng mẫu
          setCart({
            cartItems: [
              {
                id: 1,
                product: {
                  id: 1,
                  title: "Laptop Acer Swift X14 SFX14 72G 79UW",
                  price: 52990000,
                  discountPercent: 4,
                  imageUrl: "/Placeholder1.png"
                },
                price: 52990000,
                quantity: 1,
                size: null
              }
            ],
            totalPrice: 52990000,
            totalItems: 1,
            totalDiscountedPrice: 50990000
          });
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        // Nếu có lỗi, tạo giỏ hàng mẫu
        setCart({
          cartItems: [
            {
              id: 1,
              product: {
                id: 1,
                title: "Laptop Acer Swift X14 SFX14 72G 79UW",
                price: 52990000,
                discountPercent: 4,
                imageUrl: "/Placeholder1.png"
              },
              price: 52990000,
              quantity: 1,
              size: null
            }
          ],
          totalPrice: 52990000,
          totalItems: 1,
          totalDiscountedPrice: 50990000
        });
      }
    }
  }, [cartFromStore]);

  // Cập nhật URL khi step thay đổi
  useEffect(() => {
    // Tạo query parameters mới
    const params = new URLSearchParams();
    params.set('step', step.toString());
    
    if (orderId && step >= 3) {
      params.set('orderId', orderId);
    }
    
    // Cập nhật URL mà không làm reload trang
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
  }, [step, orderId]);

  // Hàm xử lý khi thay đổi thông tin giao hàng
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Hàm xử lý khi chuyển bước
  const handleNextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  // Hàm xử lý khi quay lại bước trước
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      // Quay về trang giỏ hàng
      navigate('/cart');
    }
  };
  
  // Hàm xử lý khi xác nhận đặt hàng
  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Giả lập API call tạo đơn hàng
    setTimeout(() => {
      // Tạo một mã đơn hàng ngẫu nhiên
      const generatedOrderId = 'ORD' + Math.floor(Math.random() * 1000000);
      
      // Cập nhật URL với orderId và chuyển sang bước hoàn tất
      const params = new URLSearchParams();
      params.set('step', '4');
      params.set('orderId', generatedOrderId);
      
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params}`
      );
      
      // Xóa giỏ hàng khỏi localStorage
      localStorage.removeItem('cart');
      
      setStep(4);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
  };

  // Hàm xử lý khi chọn địa chỉ giao hàng
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShippingInfo({
      fullName: `${address.firstName} ${address.lastName}`,
      phone: address.mobile,
      email: "",
      address: address.streetAddress,
      city: address.city,
      district: address.state,
      note: ""
    });
  };

  // Hàm xử lý khi tiếp tục từ bước chọn địa chỉ
  const handleAddressSubmit = (address) => {
    handleAddressSelect(address);
    handleNextStep();
  };

  // Format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Component hiển thị tiến trình thanh toán
  const CheckoutProgress = () => (
    <div className="flex justify-between mb-10 w-full">
      <div className="flex items-center">
        <div className={`w-8 h-8 font-semibold text-white ${step >= 1 ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center`}>
          1
        </div>
        <div className="ml-2 text-sm font-medium">Giỏ hàng</div>
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 font-semibold text-white ${step >= 2 ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center`}>
          2
        </div>
        <div className="ml-2 text-sm font-medium">Thông tin đặt hàng</div>
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 font-semibold text-white ${step >= 3 ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center`}>
          3
        </div>
        <div className="ml-2 text-sm font-medium">Thanh toán</div>
      </div>
      <div className="flex items-center">
        <div className={`w-8 h-8 font-semibold text-white ${step >= 4 ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center`}>
          4
        </div>
        <div className="ml-2 text-sm font-medium">Hoàn tất</div>
      </div>
    </div>
  );
  
  // Component hiển thị giỏ hàng
  const CartStep = () => {
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-lg mb-6">Giỏ hàng của bạn đang trống</p>
          <button 
            className="py-3 px-6 text-base font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/')}
          >
            TIẾP TỤC MUA SẮM
          </button>
        </div>
      );
    }
    
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">Giỏ hàng của bạn</h2>
        
        {cart.cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center p-6 mb-4 border border-gray-300">
            <div className="flex gap-6 items-center">
              <img
                src={item.product?.imageUrl || "/Placeholder1.png"}
                alt={item.product?.title || "Sản phẩm"}
                className="w-[120px] h-[120px] object-contain"
              />
              <div>
                <h3 className="mb-2 text-base font-medium">{item.product?.title || "Sản phẩm"}</h3>
                <button className="text-sm text-stone-500">
                  Xoá
                </button>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="text-2xl font-semibold text-red-600">
                {formatCurrency(item.price)}
              </div>
              {item.product?.discountPercent > 0 && (
                <div className="text-base line-through text-stone-500">
                  {formatCurrency(item.price / (1 - item.product.discountPercent / 100))}
                </div>
              )}
              <div className="flex items-center rounded border border-gray-300">
                <button className="px-3 py-2 text-base">
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  className="w-10 text-center border-x border-gray-300"
                  readOnly
                />
                <button className="px-3 py-2 text-base">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
          <p className="text-base">Phí vận chuyển:</p>
          <p className="text-base text-green-600">Miễn phí</p>
        </div>
        
        <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
          <p className="text-base font-medium">Tổng tiền:</p>
          <p className="text-2xl font-semibold text-red-600">
            {formatCurrency(cart.totalDiscountedPrice || cart.totalPrice)}
          </p>
        </div>
        
        <button 
          className="py-4 w-full text-base font-semibold text-white bg-rose-600 rounded hover:bg-rose-700 transition-colors"
          onClick={handleNextStep}
        >
          TIẾP TỤC
        </button>
      </div>
    );
  };
  
  // Component hiển thị form chọn địa chỉ giao hàng
  const AddressStep = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
      
      <AddressSelection 
        onAddressSelect={handleAddressSelect}
        onProceed={handleAddressSubmit}
      />
      
      <div className="flex justify-between mt-6">
        <button 
          className="py-4 px-8 text-base font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          onClick={handlePrevStep}
        >
          QUAY LẠI
        </button>
      </div>
    </div>
  );
  
  // Component hiển thị phương thức thanh toán
  const PaymentStep = () => (
    <div>
      <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>
      
      <div className="mb-6">
        <div className="flex items-center p-4 border border-gray-300 rounded mb-4">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mr-2"
          />
          <label htmlFor="cod" className="text-base font-medium">Thanh toán khi nhận hàng (COD)</label>
        </div>
        
        <div className="flex items-center p-4 border border-gray-300 rounded mb-4">
          <input
            type="radio"
            id="banking"
            name="paymentMethod"
            value="BANKING"
            checked={paymentMethod === "BANKING"}
            onChange={() => setPaymentMethod("BANKING")}
            className="mr-2"
          />
          <label htmlFor="banking" className="text-base font-medium">Chuyển khoản ngân hàng</label>
        </div>
        
        <div className="flex items-center p-4 border border-gray-300 rounded mb-4">
          <input
            type="radio"
            id="vnpay"
            name="paymentMethod"
            value="VNPAY"
            checked={paymentMethod === "VNPAY"}
            onChange={() => setPaymentMethod("VNPAY")}
            className="mr-2"
          />
          <label htmlFor="vnpay" className="text-base font-medium">Thanh toán bằng VNPAY</label>
        </div>
      </div>
      
      <div className="p-6 mb-6 border border-gray-300">
        <h3 className="text-lg font-medium mb-4">Thông tin đơn hàng</h3>
        
        {cart && cart.cartItems && cart.cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-3">
            <p>{item.product?.title || "Sản phẩm"} x {item.quantity}</p>
            <p className="font-medium">{formatCurrency(item.price)}</p>
          </div>
        ))}
        
        <div className="border-t border-gray-300 mt-4 pt-4">
          <div className="flex justify-between items-center mb-2">
            <p>Phí vận chuyển:</p>
            <p className="text-green-600">Miễn phí</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="font-medium">Tổng tiền:</p>
            <p className="text-xl font-semibold text-red-600">
              {cart ? formatCurrency(cart.totalDiscountedPrice || cart.totalPrice) : "0đ"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          className="py-4 px-8 text-base font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          onClick={handlePrevStep}
          disabled={isLoading}
        >
          QUAY LẠI
        </button>
        
        <button 
          className={`py-4 px-8 text-base font-semibold text-white ${isLoading ? 'bg-gray-500' : 'bg-rose-600 hover:bg-rose-700'} rounded transition-colors`}
          onClick={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
        </button>
      </div>
    </div>
  );
  
  // Component hiển thị khi đặt hàng thành công
  const CompleteStep = () => {
    const currentOrderId = queryParams.get('orderId') || 'ORD123456';
    
    return (
      <div className="text-center py-10">
        <div className="mb-6">
          <div className="relative mx-auto mt-0 mb-5 bg-green-600 rounded-full h-[60px] w-[60px] flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
          <p className="text-lg mb-6">Cảm ơn bạn đã đặt hàng tại Tech Shop.</p>
          
          <div className="bg-gray-50 p-6 rounded border border-gray-300 mb-6 text-left">
            <h3 className="text-lg font-medium mb-4">Thông tin đơn hàng #{currentOrderId}</h3>
            
            <p className="mb-2"><strong>Ngày đặt hàng:</strong> {new Date().toLocaleDateString('vi-VN')}</p><p className="mb-2"><strong>Phương thức thanh toán:</strong> {paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : paymentMethod === "BANKING" ? "Chuyển khoản ngân hàng" : "Thanh toán VNPAY"}</p>
            <p className="mb-2"><strong>Địa chỉ giao hàng:</strong> {selectedAddress ? `${selectedAddress.streetAddress}, ${selectedAddress.city}, ${selectedAddress.state}` : "Không có thông tin"}</p>
            <p className="mb-2"><strong>Tổng tiền:</strong> {cart ? formatCurrency(cart.totalDiscountedPrice || cart.totalPrice) : "0đ"}</p>
          </div>
          
          <p className="mb-6">Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
          
          <div className="flex justify-center gap-4">
            <button 
              className="py-3 px-6 text-base font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/')}
            >
              TIẾP TỤC MUA SẮM
            </button>
            
            <button 
              className="py-3 px-6 text-base font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
              onClick={() => navigate('/account/order')}
            >
              XEM ĐƠN HÀNG
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Hiển thị màn hình loading khi chưa tải xong giỏ hàng
  if (!cart && step !== 4) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-center mb-8">Thanh Toán</h1>
        <div className="py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <BreadcrumbNav />
        <h1 className="text-3xl font-bold text-center mb-8">{
          step === 1 ? "Giỏ hàng" : 
          step === 2 ? "Thông tin đặt hàng" : 
          step === 3 ? "Thanh Toán" : 
          "Hoàn tất đơn hàng"
        }</h1>
        
        <CheckoutProgress />
        
        {step === 1 && <CartStep />}
        {step === 2 && <AddressStep />}
        {step === 3 && <PaymentStep />}
        {step === 4 && <CompleteStep />}
      </div>
    </div>
  );
};

export default Checkout;