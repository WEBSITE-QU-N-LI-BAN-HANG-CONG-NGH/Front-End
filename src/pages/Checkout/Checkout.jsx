import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // 1. Import axios
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import { getAddress } from '../../State/Order/Action';
import { orderService } from '../../services/order.service';
import { useToast } from '../../contexts/ToastContext';
// import Cart from '../Cart/Cart'; // Không cần import Cart ở đây nữa

const API_BASE_URL_LOCATION = "https://open.oapi.vn/location"; // 2. Sửa API endpoint

const Checkout = () => {
const navigate = useNavigate();
const { showToast } = useToast();
const queryParams = new URLSearchParams(window.location.search);
const initialStep = parseInt(queryParams.get('step') || '2');
const orderId = queryParams.get('orderId');

const [step, setStep] = useState(initialStep < 2 ? 2 : initialStep);
const [isLoading, setIsLoading] = useState(false);
const [selectedAddress, setSelectedAddress] = useState(null);

const [shippingInfo, setShippingInfo] = useState({
  fullName: "", phone: "", email: "", address: "",
  city: "", district: "", ward: "", note: ""
});

// State cho dữ liệu địa chỉ từ API mới
const [provinces, setProvinces] = useState([]);
const [districts, setDistricts] = useState([]);
const [wards, setWards] = useState([]);

// State cho ID đang được chọn trong dropdown
const [selectedProvinceId, setSelectedProvinceId] = useState('');
const [selectedDistrictId, setSelectedDistrictId] = useState('');
const [selectedWardId, setSelectedWardId] = useState('');

// State cho trạng thái loading
const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
const [isLoadingWards, setIsLoadingWards] = useState(false);


const { address } = useSelector(store => store.order)
const dispatch = useDispatch();
// Dữ liệu mẫu địa chỉ đã lưu
const [savedAddresses, setSavedAddresses] = useState([]);

useEffect(() => {
  dispatch(getAddress());
}, [dispatch])
  

useEffect(() => {
  // Chỉ cập nhật nếu address.data tồn tại và là một mảng
  if (address && Array.isArray(address.data)) {
    setSavedAddresses(address.data);
      // Tùy chọn: Tự động chọn địa chỉ mặc định nếu có
      const defaultAddress = address.data.find(addr => addr.isDefault);
      if (defaultAddress && !selectedAddress) {
          handleAddressSelect(defaultAddress);
      }
  } else {
    // Có thể xử lý trường hợp không có dữ liệu hoặc lỗi
    // setSavedAddresses([]); // Đặt lại thành mảng rỗng nếu cần
    if (address && !Array.isArray(address.data)) {
        console.warn("Address data from Redux is not an array:", address);
    }
  }
}, [address]);


const [paymentMethod, setPaymentMethod] = useState("COD");

// --- Fetch API Địa chỉ ---
// Fetch Provinces
useEffect(() => {
  const fetchProvinces = async () => {
    setIsLoadingProvinces(true);
    try {
      // 2. & 3. Sửa URL và cách lấy dữ liệu
      const response = await axios.get(`${API_BASE_URL_LOCATION}/provinces?page=0&size=63`); // Lấy nhiều hơn nếu cần
      setProvinces(response.data?.data || []); // Lấy từ thuộc tính 'data'
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setIsLoadingProvinces(false);
    }
  };
  fetchProvinces();
}, []);

// Fetch Districts when province changes
useEffect(() => {
  if (!selectedProvinceId) {
    setDistricts([]);
    setSelectedDistrictId('');
    setWards([]); // Clear wards as well
    setSelectedWardId('');
    return;
  }
  const fetchDistricts = async () => {
    setIsLoadingDistricts(true);
    setWards([]);
    setSelectedWardId('');
    try {
      // 2. & 3. & 4. Sửa URL, cách lấy dữ liệu và endpoint
      const response = await axios.get(`${API_BASE_URL_LOCATION}/districts/${selectedProvinceId}?page=0&size=50`);
      setDistricts(response.data?.data || []); // Lấy từ thuộc tính 'data'
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoadingDistricts(false);
    }
  };
  fetchDistricts();
}, [selectedProvinceId]); // Chạy khi selectedProvinceId thay đổi

// Fetch Wards when district changes
useEffect(() => {
  if (!selectedDistrictId) {
    setWards([]);
    setSelectedWardId('');
    return;
  }
  const fetchWards = async () => {
    setIsLoadingWards(true);
    try {
        // 2. & 3. & 4. Sửa URL, cách lấy dữ liệu và endpoint
      const response = await axios.get(`${API_BASE_URL_LOCATION}/wards/${selectedDistrictId}?page=0&size=50`);
      setWards(response.data?.data || []); // Lấy từ thuộc tính 'data'
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
      setIsLoadingWards(false);
    }
  };
  fetchWards();
}, [selectedDistrictId]); // Chạy khi selectedDistrictId thay đổi
// --- Kết thúc Fetch API ---


// --- Handlers ---
// 5. Định nghĩa các handlers
const handleShippingChange = (e) => {
  const { name, value } = e.target;
  setShippingInfo(prev => ({ ...prev, [name]: value }));
};

const handleProvinceChange = (e) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(id);
    setShippingInfo(prev => ({
        ...prev,
        city: id ? name : '',
        district: '',
        ward: ''
    }));
    setSelectedDistrictId('');
    setSelectedWardId('');
    setDistricts([]);
    setWards([]);
};

const handleDistrictChange = (e) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedDistrictId(id);
      setShippingInfo(prev => ({
        ...prev,
        district: id ? name : '',
        ward: ''
    }));
    setSelectedWardId('');
    setWards([]);
};

  const handleWardChange = (e) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedWardId(id);
      setShippingInfo(prev => ({
        ...prev,
        ward: id ? name : ''
    }));
};

const handleNextStep = () => {
  if (!selectedAddress && (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !selectedProvinceId || !selectedDistrictId || !selectedWardId)) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng hoặc chọn địa chỉ đã lưu.");
      return;
  }
  setStep(step + 1);
  
  // Add this code to update URL with addressId
  if (step === 2 && selectedAddress) {
    const params = new URLSearchParams();
    params.set('step', '3');
    params.set('addressId', selectedAddress.id);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }
  
  window.scrollTo(0, 0);
};

const handlePrevStep = () => {
  if (step === 1) {
      navigate('/cart');
  } else if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
  }
};

const handlePlaceOrder = async () => {
  setIsLoading(true);
  try {
    // Get addressId from URL or selected address
    const urlParams = new URLSearchParams(window.location.search);
    const addressId = urlParams.get('addressId') || (selectedAddress ? selectedAddress.id : null);
    
    
    const response = await orderService.createOrder(addressId);

    console.log('response :>> ', response);
    const params = new URLSearchParams();
    params.set('step', '4');
    params.set('orderId', response.data.id);
    params.set('addressId', addressId); // Keep the addressId in URL
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    setStep(4);
    
    // Display the addressId (could show in an alert or toast)
    console.log("Order placed with addressId:", addressId);
    alert(`Đơn hàng đã được đặt thành công với địa chỉ ID: ${addressId}`);

  } catch (error) {
    console.error("Error creating order:", error);
    alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
  } finally {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }
};


const handleAddressSelect = (address) => { /* ... Giữ nguyên ... */
    setSelectedAddress(address);
    setSelectedProvinceId('');
    setSelectedDistrictId('');
    setSelectedWardId('');
    setDistricts([]);
    setWards([]);
};


const handleAddAddress = async () => {
  // Validate the form
  if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || 
      !selectedProvinceId || !selectedDistrictId || !selectedWardId) {
    showToast("Vui lòng điền đầy đủ thông tin địa chỉ.", "error");
    return;
  }
  
  // Prepare address data
  const addressData = {
    fullName: shippingInfo.fullName,
    phoneNumber: shippingInfo.phone,
    email: shippingInfo.email,
    street: shippingInfo.address,
    province: shippingInfo.city,
    district: shippingInfo.district,
    ward: shippingInfo.ward,
    note: shippingInfo.note,
  };
  
  // Call your API to save address
  try {
    await orderService.addAddress(addressData);
    dispatch(getAddress());
    setShippingInfo({ fullName: "", phone: "", email: "", address: "", city: "", district: "", ward: "", note: "" });
      
      showToast("Địa chỉ đã được thêm thành công!", "success");
  } catch (error) {
    console.error("Error adding address:", error);
    alert("Có lỗi xảy ra khi thêm địa chỉ. Vui lòng thử lại.");
  }
};

const formatCurrency = (amount) => { /* ... Giữ nguyên ... */
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount || 0);
};
// --- Kết thúc Handlers ---

// 3. Bỏ hàm handleQuantityChange và handleRemoveItem

// Component hiển thị tiến trình thanh toán (Giữ nguyên, bắt đầu từ bước 2)
// Component hiển thị tiến trình thanh toán (Đã sửa)
const CheckoutProgress = () => (
  // Bỏ div lồng nhau không cần thiết
  <div className="flex justify-between mb-10 w-full">
    <div className="flex items-center">
      <div className={`w-8 h-8 font-semibold text-white bg-blue-600 rounded-full flex items-center justify-center`}>
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

// 2. Bỏ hoàn toàn component CartStep

// Component hiển thị form chọn địa chỉ giao hàng (Step 2 - Giữ nguyên)
const AddressStep = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Phần địa chỉ đã lưu (Đã sửa ở bước trước) */}
    <div>
      <h2 className="text-xl font-bold mb-6">Địa chỉ đã lưu</h2>
      <div className="max-h-80 overflow-y-auto pr-2 space-y-4">
          {savedAddresses.map(address => (
            <div
              key={address.id}
              className={`p-4 border ${selectedAddress && selectedAddress.id === address.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} rounded-md cursor-pointer hover:border-blue-400`}
              onClick={() => handleAddressSelect(address)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{address?.fullName}</h3>
                  <p className="text-gray-600 mt-1 text-sm">{address?.phoneNumber}</p>
                  <p className="text-gray-600 text-sm">{address?.street}</p>
                  <p className="text-gray-600 text-sm">{address?.ward}, {address?.district}, {address?.province}</p>
                </div>
                {address.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Mặc định</span>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>

    {/* Form điền thông tin mới (Đã sửa ở bước trước để dùng API mới) */}
    <div>
      <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
      <form className="space-y-4">
          {/* Họ tên, SĐT, Email giữ nguyên */}
          <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
              <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
              <input type="tel" id="phone" name="phone" value={shippingInfo.phone} onChange={handleShippingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" value={shippingInfo.email} onChange={handleShippingChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        {/* ---- Phần địa chỉ với Dropdown (Sử dụng ID và API mới) ---- */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố *</label>
                <select
                    id="province"
                    name="province"
                    value={selectedProvinceId} // Sử dụng selectedProvinceId
                    onChange={handleProvinceChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                    disabled={isLoadingProvinces}
                    required
                >
                    <option value="">{isLoadingProvinces ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}</option>
                    {/* Map qua provinces, dùng id và name */}
                    {provinces.map(province => (
                        <option key={province.id} value={province.id}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện *</label>
                <select
                    id="district"
                    name="district"
                    value={selectedDistrictId} // Sử dụng selectedDistrictId
                    onChange={handleDistrictChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                    disabled={!selectedProvinceId || isLoadingDistricts}
                    required
                >
                    <option value="">{isLoadingDistricts ? 'Đang tải...' : 'Chọn Quận/Huyện'}</option>
                    {/* Map qua districts, dùng id và name */}
                    {districts.map(district => (
                        <option key={district.id} value={district.id}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>
          </div>
          <div>
            <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã *</label>
            <select
                id="ward"
                name="ward"
                value={selectedWardId} // Sử dụng selectedWardId
                onChange={handleWardChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                disabled={!selectedDistrictId || isLoadingWards}
                required
            >
                <option value="">{isLoadingWards ? 'Đang tải...' : 'Chọn Phường/Xã'}</option>
                  {/* Map qua wards, dùng id và name */}
                {wards.map(ward => (
                    <option key={ward.id} value={ward.id}>
                        {ward.name}
                    </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Số nhà, tên đường *</label>
            <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                placeholder="Ví dụ: 123 Nguyễn Huệ"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
          {/* ---- Kết thúc phần địa chỉ ---- */}

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea id="note" name="note" value={shippingInfo.note} onChange={handleShippingChange} rows="3" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </form>
    </div>

    {/* Nút bấm (Đã sửa ở bước trước) */}
      <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
      <button
        className="py-4 px-8 text-base font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        onClick={handlePrevStep}
      >
        QUAY LẠI GIỎ HÀNG
      </button>
      <div className="flex gap-4">
        <button
          className="py-4 px-8 text-base font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
          onClick={handleAddAddress}
        >
          THÊM ĐỊA CHỈ
        </button>
        <button
          className="py-4 px-8 text-base font-semibold text-white bg-rose-600 rounded hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNextStep}
          disabled={!selectedAddress}
        >
          TIẾP TỤC THANH TOÁN
        </button>
      </div>
    </div>
  </div>
);


// Component hiển thị phương thức thanh toán (Step 3)
const PaymentStep = () => {
  // 4. Lấy cart data trực tiếp từ store
  const cartDataForPayment = useSelector(state => state.cart?.cart);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Phương thức thanh toán</h2>
      {/* Phần chọn phương thức giữ nguyên */}
        <div className="mb-6">
          <div className="flex items-center p-4 border border-gray-300 rounded mb-4">
            <input type="radio" id="cod" name="paymentMethod" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="mr-2"/>
            <label htmlFor="cod" className="text-base font-medium">Thanh toán khi nhận hàng (COD)</label>
          </div>
          <div className="flex items-center p-4 border border-gray-300 rounded mb-4">
            <input type="radio" id="vnpay" name="paymentMethod" value="VNPAY" checked={paymentMethod === "VNPAY"} onChange={() => setPaymentMethod("VNPAY")} className="mr-2"/>
            <label htmlFor="vnpay" className="text-base font-medium">Thanh toán bằng VNPAY</label>
          </div>
        </div>

      {/* Phần thông tin đơn hàng */}
      <div className="p-6 mb-6 border border-gray-300">
        <h3 className="text-lg font-medium mb-4">Thông tin đơn hàng</h3>
        {/* Sử dụng cartDataForPayment lấy từ store */}
        {cartDataForPayment && cartDataForPayment.cartItems && cartDataForPayment.cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-3">
            <p>{item.product?.title || "Sản phẩm"} x {item.quantity}</p>
            <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
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
              {cartDataForPayment ? formatCurrency(cartDataForPayment.totalPrice) : "0đ"}
            </p>
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-between">
        <button
          className="py-4 px-8 text-base font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          onClick={handlePrevStep}
          disabled={isLoading}
        >
          QUAY LẠI
        </button>
        <button
          className={`py-4 px-8 text-base font-semibold text-white ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'} rounded transition-colors`}
          onClick={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'}
        </button>
      </div>
    </div>
  );
};

// Component hiển thị khi đặt hàng thành công (Step 4 - Cập nhật để lấy cart từ store)
const CompleteStep = () => {
  const currentOrderId = queryParams.get('orderId') || 'ORD123456';
  // Lấy cart cuối cùng từ store để hiển thị tổng tiền chính xác
  const finalCartData = useSelector(state => state.cart?.cart);

  return (
    <div className="text-center py-10">
      <div className="mb-6">
          {/* Icon và tiêu đề giữ nguyên */}
          <div className="relative mx-auto mt-0 mb-5 bg-green-600 rounded-full h-[60px] w-[60px] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"> <polyline points="20 6 9 17 4 12"></polyline> </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
          <p className="text-lg mb-6">Cảm ơn bạn đã đặt hàng tại Tech Shop.</p>

          {/* Thông tin đơn hàng */}
          <div className="bg-gray-50 p-6 rounded border border-gray-300 mb-6 text-left">
            <h3 className="text-lg font-medium mb-4">Thông tin đơn hàng #{currentOrderId}</h3>
            <p className="mb-2"><strong>Ngày đặt hàng:</strong> {new Date().toLocaleDateString('vi-VN')}</p>
            <p className="mb-2"><strong>Phương thức thanh toán:</strong> {paymentMethod === "COD" ? "Thanh toán khi nhận hàng" : "Thanh toán VNPAY"}</p>
            {/* Hiển thị địa chỉ đã chọn hoặc điền */}
            <p className="mb-2"><strong>Địa chỉ giao hàng:</strong> {selectedAddress ? `${selectedAddress.streetAddress}, ${selectedAddress.state}, ${selectedAddress.city}` : `${shippingInfo.address}, ${shippingInfo.district}, ${shippingInfo.city}`}</p>
            <p className="mb-2"><strong>Tổng tiền:</strong> {finalCartData ? formatCurrency(finalCartData.totalPrice) : "Đang cập nhật..."}</p>
          </div>

          <p className="mb-6">Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>

          {/* Nút điều hướng giữ nguyên */}
          <div className="flex justify-center gap-4">
            <button className="py-3 px-6 text-base font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors" onClick={() => navigate('/')}> TIẾP TỤC MUA SẮM </button>
            <button className="py-3 px-6 text-base font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors" onClick={() => navigate('/account/orders')}> XEM ĐƠN HÀNG </button> {/* Sửa lại link xem đơn hàng */}
          </div>
      </div>
    </div>
  );
};

// 7. Bỏ màn hình loading dựa trên state cart cục bộ

// Nếu step < 2 (do URL hoặc logic), component sẽ không render gì
// hoặc có thể render một thông báo chuyển hướng (tùy chọn)
if (step < 2 && !window.location.pathname.endsWith('/cart')) {
    return <div className="text-center py-10">Đang chuyển hướng đến giỏ hàng...</div>; // Hoặc null
}


// Chỉ render nội dung của Checkout khi step >= 2
return (
  <div className="bg-white min-h-screen">
    <div className="max-w-7xl mx-auto py-8 px-2">
      <BreadcrumbNav />
      <h1 className="text-3xl font-bold text-center mb-8">{
        step === 2 ? "Thông tin đặt hàng" :
        step === 3 ? "Thanh Toán" :
        step === 4 ? "Hoàn tất đơn hàng" : "Thanh Toán" // Fallback title
      }</h1>

      <CheckoutProgress />

      {/* 5. Bỏ render điều kiện cho step 1 */}
      {step === 2 && <AddressStep />}
      {step === 3 && <PaymentStep />}
      {step === 4 && <CompleteStep />}
    </div>
  </div>
);
};

export default Checkout;