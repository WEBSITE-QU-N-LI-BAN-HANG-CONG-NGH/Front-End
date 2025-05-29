// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// XÓA: import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import BreadcrumbNav from "../../components/layout/BreadcrumbNav"; // Nếu không dùng thì xóa
// XÓA: import { getAddress, getOrderById } from '../../State/Order/Action';
import { useOrderContext } from '../../contexts/OrderContext'; // THÊM
import { useCartContext } from '../../contexts/CartContext';   // THÊM
import { orderService } from '../../services/order.service'; // Giữ lại cho VNPAY và sendEmail
import { cartService } from '../../services/cart.service';   // Giữ lại cho clearCart
import { useToast } from '../../contexts/ToastContext';
import AddressStep from './AddressStep'; // Component này sẽ nhận props từ Checkout
import { CircularProgress, Typography, Button as MuiButton, Box } from '@mui/material'; // THÊM MUI

const API_BASE_URL_LOCATION = "https://open.oapi.vn/location";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Đổi tên biến để tránh trùng với location từ window
  const { showToast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const initialStep = parseInt(queryParams.get('step') || '2'); // Bắt đầu từ bước địa chỉ
  const orderIdFromUrl = queryParams.get('orderId');

  // Contexts
  const {
    addresses: savedAddressesContext, // đổi tên để tránh nhầm lẫn
    currentOrder: orderFromContext,
    isLoading: isOrderLoading,
    error: orderError,
    fetchAddresses,
    addNewAddress: addNewAddressContext,
    createNewOrder: createNewOrderContext,
    fetchOrderById: fetchOrderByIdContext,
    clearOrderError
  } = useOrderContext();

  const { cart: cartData, isLoading: isCartLoading, clearCartContext: clearCart } = useCartContext(); // Lấy clearCart từ context

  // States
  const [step, setStep] = useState(initialStep < 2 ? 2 : initialStep);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "", phone: "", email: "", address: "", // 'address' là số nhà, tên đường
    city: "", district: "", ward: "", note: ""
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWardId, setSelectedWardId] = useState('');
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // VNPAY related states
  const [vnpayStatus, setVnpayStatus] = useState(null);
  const [vnpayMessage, setVnpayMessage] = useState('');
  const [processedOrderId, setProcessedOrderId] = useState(orderIdFromUrl);
  const emailSentRef = useRef(false); // Để đảm bảo email chỉ gửi 1 lần

  // Fetch addresses from context
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // Set default selected address if available from context
  useEffect(() => {
    if (savedAddressesContext && savedAddressesContext.length > 0 && !selectedAddress) {
      const defaultAddress = savedAddressesContext.find(addr => addr.isDefault) || savedAddressesContext[0];
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
         // Cập nhật URL với addressId khi tự động chọn
        if (step === 2 && defaultAddress.id) {
            const params = new URLSearchParams(location.search);
            if (!params.has('addressId')) { // Chỉ set nếu chưa có
                params.set('addressId', defaultAddress.id);
                navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`, { replace: true });
            }
        }
      }
    }
  }, [savedAddressesContext, selectedAddress, step, location.search, location.pathname, navigate]);


  // Fetch order details for step 4 (CompleteStep)
  useEffect(() => {
    const orderIdForStep4 = queryParams.get('orderId');
    if (step === 4 && orderIdForStep4) {
        setProcessedOrderId(orderIdForStep4);
        fetchOrderByIdContext(orderIdForStep4);
    }
  }, [step, location.search, fetchOrderByIdContext]);


  // API calls for provinces, districts, wards (giữ nguyên)
  useEffect(() => { /* Fetch Provinces */
    const fetchProvincesAPI = async () => {
      setIsLoadingProvinces(true);
      try {
        const response = await axios.get(`${API_BASE_URL_LOCATION}/provinces?page=0&size=70`);
        setProvinces(response.data?.data || []);
      } catch (error) { console.error("Error fetching provinces:", error); }
      finally { setIsLoadingProvinces(false); }
    };
    fetchProvincesAPI();
  }, []);

  useEffect(() => { /* Fetch Districts */
    if (!selectedProvinceId) { setDistricts([]); setSelectedDistrictId(''); setWards([]); setSelectedWardId(''); return; }
    const fetchDistrictsAPI = async () => {
      setIsLoadingDistricts(true); setWards([]); setSelectedWardId('');
      try {
        const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\_LOCATION\}/districts/</span>{selectedProvinceId}?page=0&size=100`);
        setDistricts(response.data?.data || []);
      } catch (error) { console.error("Error fetching districts:", error); }
      finally { setIsLoadingDistricts(false); }
    };
    fetchDistrictsAPI();
  }, [selectedProvinceId]);

  useEffect(() => { /* Fetch Wards */
    if (!selectedDistrictId) { setWards([]); setSelectedWardId(''); return; }
    const fetchWardsAPI = async () => {
      setIsLoadingWards(true);
      try {
        const response = await axios.get(`<span class="math-inline">\{API\_BASE\_URL\_LOCATION\}/wards/</span>{selectedDistrictId}?page=0&size=100`);
        setWards(response.data?.data || []);
      } catch (error) { console.error("Error fetching wards:", error); }
      finally { setIsLoadingWards(false); }
    };
    fetchWardsAPI();
  }, [selectedDistrictId]);

  // VNPAY Callback Handling
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const isVNPayReturn = searchParams.has('vnp_ResponseCode');
    const currentStepFromUrl = parseInt(searchParams.get('step') || '0', 10);

    if (isVNPayReturn && currentStepFromUrl === 4 && vnpayStatus === null) {
      setVnpayStatus('processing');
      setVnpayMessage('Đang xác nhận kết quả thanh toán VNPAY...');
      const paramsObject = Object.fromEntries(searchParams);
      const vnp_ResponseCode = paramsObject['vnp_ResponseCode'];
      const vnp_TxnRef = paramsObject['vnp_TxnRef'];
      const extractedOrderId = vnp_TxnRef ? vnp_TxnRef.split('_')[0] : searchParams.get('orderId');

      setProcessedOrderId(extractedOrderId); // Lưu orderId từ VNPAY

      const processCallback = async () => {
        try {
          await orderService.handleVNPayCallback(paramsObject);
          if (vnp_ResponseCode === '00') {
            setVnpayStatus('success');
            setVnpayMessage('Thanh toán qua VNPAY thành công!');
            showToast('Thanh toán thành công!', 'success');
            if (extractedOrderId && !emailSentRef.current) {
                await cartService.clearCart(); // Xóa cart ở client (nếu cần, vì cart context sẽ tự fetch lại)
                await clearCart(); // Xóa cart trong context và backend
                await orderService.sendOrderToEmail(extractedOrderId);
                emailSentRef.current = true;
            }
          } else {
            setVnpayStatus('failed');
            setVnpayMessage(`Thanh toán qua VNPAY thất bại. Mã lỗi: ${vnp_ResponseCode}.`);
            showToast('Thanh toán thất bại.', 'error');
          }
        } catch (error) {
          console.error("Lỗi khi xử lý VNPAY callback:", error);
          setVnpayStatus('failed');
          setVnpayMessage('Lỗi khi xác nhận kết quả thanh toán.');
          showToast('Lỗi xác nhận thanh toán.', 'error');
        }
      };
      processCallback();
    } else if (currentStepFromUrl === 4 && !isVNPayReturn && vnpayStatus === null) {
         const currentOrderId = searchParams.get('orderId');
         if(currentOrderId) {
             setProcessedOrderId(currentOrderId);
             // Nếu là COD và chưa gửi mail
             const orderDetails = orderFromContext; // Lấy order từ context
             if(orderDetails && orderDetails.paymentMethod === "COD" && orderDetails.id === currentOrderId && !emailSentRef.current){
                // Không cần gọi clearCart() hay sendOrderToEmail() ở đây nữa
                // vì nó đã được xử lý trong handlePlaceOrder cho COD
             }
         }
    }
  }, [location.search, vnpayStatus, showToast, clearCart, orderFromContext]);


  // Handlers
  const handleShippingChange = (e) => { const { name, value } = e.target; setShippingInfo(prev => ({ ...prev, [name]: value })); };
  const handleProvinceChange = (e) => { /* ... (giữ nguyên) ... */
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(id);
    setShippingInfo(prev => ({ ...prev, city: id ? name : '', district: '', ward: '' }));
    setSelectedDistrictId(''); setSelectedWardId(''); setDistricts([]); setWards([]);
  };
  const handleDistrictChange = (e) => { /* ... (giữ nguyên) ... */
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedDistrictId(id);
    setShippingInfo(prev => ({ ...prev, district: id ? name : '', ward: '' }));
    setSelectedWardId(''); setWards([]);
  };
  const handleWardChange = (e) => { /* ... (giữ nguyên) ... */
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setSelectedWardId(id);
    setShippingInfo(prev => ({ ...prev, ward: id ? name : '' }));
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    // Xóa thông tin form điền mới để tránh nhầm lẫn
    setShippingInfo({ fullName: "", phone: "", email: "", address: "", city: "", district: "", ward: "", note: "" });
    setSelectedProvinceId(''); setSelectedDistrictId(''); setSelectedWardId('');
    setDistricts([]); setWards([]);

    // Cập nhật URL với addressId đã chọn
    const params = new URLSearchParams(location.search);
    params.set('addressId', address.id);
    params.delete('step'); // Xóa step cũ nếu có để handleNextStep set lại
    navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`, { replace: true });
  };

  const handleNextStep = () => {
    clearOrderError(); // Xóa lỗi cũ từ context
    // Validate AddressStep
    if (step === 2) {
        if (!selectedAddress && (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !selectedProvinceId || !selectedDistrictId || !selectedWardId)) {
            showToast("Vui lòng điền đầy đủ thông tin giao hàng hoặc chọn địa chỉ đã lưu.", "warning");
            return;
        }
        // Logic để thêm địa chỉ mới nếu người dùng điền form thay vì chọn
        if (!selectedAddress && shippingInfo.fullName) { // Người dùng điền form mới
            // Không tự động thêm ở đây, để người dùng nhấn nút "THÊM ĐỊA CHỈ"
            // Nếu muốn đi tiếp mà không lưu, thì không cần addressId
            const params = new URLSearchParams(location.search);
            params.set('step', '3');
            params.delete('addressId'); // Xóa addressId nếu điền form mới mà không lưu
            // Truyền thông tin địa chỉ mới qua state nếu cần
            navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`, { state: { newShippingInfo: shippingInfo } });

        } else if (selectedAddress) { // Người dùng chọn địa chỉ đã lưu
            const params = new URLSearchParams(location.search);
            params.set('step', '3');
            params.set('addressId', selectedAddress.id);
            navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`);
        }
         setStep(3);
    } else if (step === 3) {
        // Không cần validate gì ở bước thanh toán, chỉ cần chuyển qua bước hoàn tất (nếu là COD)
        // Hoặc chuyển qua VNPAY
        // Việc xử lý logic đặt hàng sẽ nằm trong handlePlaceOrder
    }
    window.scrollTo(0, 0);
  };


  const handlePrevStep = () => {
    clearOrderError();
    const params = new URLSearchParams(location.search);
    if (step === 2) {
        navigate('/cart');
    } else if (step > 2) {
        params.set('step', (step - 1).toString());
        navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`);
        setStep(step - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleAddAddressAndContinue = async () => {
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !selectedProvinceId || !selectedDistrictId || !selectedWardId) {
        showToast("Vui lòng điền đầy đủ thông tin địa chỉ.", "error");
        return;
    }
    const addressData = {
        fullName: shippingInfo.fullName,
        phoneNumber: shippingInfo.phone,
        email: shippingInfo.email, // email là optional
        street: shippingInfo.address,
        province: shippingInfo.city,
        district: shippingInfo.district,
        ward: shippingInfo.ward,
        note: shippingInfo.note,
    };
    try {
        const newAddedAddress = await addNewAddressContext(addressData);
        if (newAddedAddress && newAddedAddress.data?.id) {
             setSelectedAddress(newAddedAddress.data); // Chọn luôn địa chỉ vừa thêm
             showToast("Địa chỉ đã được thêm và chọn thành công!", "success");
             const params = new URLSearchParams(location.search);
             params.set('step', '3');
             params.set('addressId', newAddedAddress.data.id);
             navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`);
             setStep(3);
             window.scrollTo(0,0);
        } else {
             showToast("Thêm địa chỉ thành công, vui lòng chọn lại từ danh sách.", "info");
             // Reset form sau khi thêm
             setShippingInfo({ fullName: "", phone: "", email: "", address: "", city: "", district: "", ward: "", note: "" });
             setSelectedProvinceId(''); setSelectedDistrictId(''); setSelectedWardId('');
        }
    } catch (error) {
        showToast(error.message || "Có lỗi xảy ra khi thêm địa chỉ.", "error");
    }
  };


  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    clearOrderError();
    const addressIdFromUrl = queryParams.get('addressId');

    if (!addressIdFromUrl && paymentMethod !== "VNPAY_SKIP_ADDRESS_FOR_NOW") { // Cần addressId cho COD hoặc VNPAY đã có địa chỉ
         showToast("Vui lòng chọn hoặc cung cấp địa chỉ giao hàng.", "error");
         setIsPlacingOrder(false);
         return;
    }

    try {
      // Tạo đơn hàng trước, backend sẽ trả về orderId
      const orderResponse = await createNewOrderContext(addressIdFromUrl);
      const createdOrder = orderResponse; // createNewOrderContext trả về data của order

      if (!createdOrder || !createdOrder.id) {
        throw new Error("Không nhận được ID đơn hàng sau khi tạo.");
      }
      setProcessedOrderId(createdOrder.id); // Lưu orderId để dùng ở CompleteStep

      if (paymentMethod === "VNPAY") {
        const paymentResponse = await orderService.createVNPayPayment(createdOrder.id);
        if (paymentResponse.data?.paymentUrl) {
          window.location.href = paymentResponse.data.paymentUrl;
          // Không setIsLoading(false) ở đây vì trang sẽ chuyển hướng
          return;
        } else {
          throw new Error("Không nhận được link thanh toán VNPAY.");
        }
      } else { // COD
        // Xóa giỏ hàng sau khi đặt hàng COD thành công
        await clearCart(); // Gọi hàm clearCart từ CartContext
        // Gửi email đơn hàng
        await orderService.sendOrderToEmail(createdOrder.id);
        emailSentRef.current = true;

        const params = new URLSearchParams();
        params.set('step', '4');
        params.set('orderId', createdOrder.id);
        navigate(`<span class="math-inline">\{location\.pathname\}?</span>{params.toString()}`, { replace: true });
        setStep(4);
        // Không cần reload, vì useEffect của step=4 sẽ fetch order
      }
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      showToast(orderError || err.message || "Đặt hàng thất bại.", "error");
      // orderError sẽ được set bởi createNewOrderContext nếu có lỗi API
    } finally {
      // Chỉ dừng loading nếu là COD hoặc có lỗi trước khi chuyển qua VNPAY
      if (paymentMethod !== 'VNPAY' || orderError || (isPlacingOrder && !window.location.href.startsWith("https://sandbox.vnpayment.vn"))) {
        setIsPlacingOrder(false);
      }
    }
  };


  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(amount || 0);

  // Render Logic
  const CheckoutProgress = () => (
    <div className="flex justify-between mb-10 w-full max-w-3xl mx-auto">
        {["Giỏ hàng", "Thông tin", "Thanh toán", "Hoàn tất"].map((label, index) => (
            <div key={label} className={`flex items-center ${index > 0 ? 'flex-1 justify-center relative' : ''}`}>
            {index > 0 && <div className={`absolute left-0 w-1/2 h-0.5 ${index <= (step -1) ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
            <div className={`w-8 h-8 font-semibold text-white ${index <= (step -1) ? "bg-blue-600" : "bg-gray-300"} rounded-full flex items-center justify-center z-10 text-sm`}>
                {index + 1}
            </div>
            {index < 3 && <div className={`absolute right-0 w-1/2 h-0.5 ${index < (step -1) ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
            <div className="ml-2 text-xs sm:text-sm font-medium hidden sm:block text-gray-700">{label}</div>
            </div>
        ))}
    </div>
  );

  const PaymentStep = () => (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Chọn phương thức thanh toán</h2>
      <div className="space-y-4 mb-8">
        <div
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "COD" ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
            onClick={() => setPaymentMethod("COD")}
        >
            <input type="radio" id="cod" name="paymentMethod" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"/>
            <label htmlFor="cod" className="text-base font-medium text-gray-700">Thanh toán khi nhận hàng (COD)</label>
        </div>
        <div
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "VNPAY" ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
            onClick={() => setPaymentMethod("VNPAY")}
        >
            <input type="radio" id="vnpay" name="paymentMethod" value="VNPAY" checked={paymentMethod === "VNPAY"} onChange={() => setPaymentMethod("VNPAY")} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"/>
            <label htmlFor="vnpay" className="text-base font-medium text-gray-700">Thanh toán qua VNPAY</label>
            <img src="/VNPayIcon.jpg" alt="VNPAY" className="w-8 h-8 ml-auto rounded"/>
        </div>
      </div>

      <div className="p-6 mb-6 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Thông tin đơn hàng</h3>
        {isCartLoading ? <CircularProgress /> : !cartData || !cartData.cartItems || cartData.cartItems.length === 0 ? (
            <Typography>Giỏ hàng trống hoặc đang tải...</Typography>
        ) : (
            <div className="space-y-3">
                {cartData.cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-200 last:border-b-0">
                    <div>
                        <p className='font-medium text-gray-800'>{item.productName}</p>
                        <p className='text-sm text-gray-500'>SL: x{item.quantity} {item.size ? `(${item.size})` : ''}</p>
                    </div>
                    <p className="font-semibold text-red-600 whitespace-nowrap">{formatCurrency(item.discountedPrice * item.quantity)}</p>
                    </div>
                ))}
                <div className="border-t border-gray-300 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-gray-600"><p>Tạm tính:</p> <p>{formatCurrency(cartData.totalOriginalPrice)}</p></div>
                    <div className="flex justify-between text-gray-600"><p>Giảm giá:</p> <p className="text-green-600">-{formatCurrency(cartData.discount)}</p></div>
                    <div className="flex justify-between text-lg font-bold text-gray-800"><p>Tổng cộng:</p> <p className="text-red-600">{formatCurrency(cartData.totalDiscountedPrice)}</p></div>
                </div>
            </div>
        )}
      </div>
        {orderError && <Alert severity="error" sx={{mb:2}}>{orderError}</Alert>}
      <div className="flex justify-between mt-8">
        <MuiButton variant="outlined" onClick={handlePrevStep} disabled={isPlacingOrder} sx={{py:1.5, px:4}}>Quay Lại</MuiButton>
        <MuiButton variant="contained" onClick={handlePlaceOrder} disabled={isPlacingOrder || isCartLoading || !cartData?.cartItems?.length} sx={{py:1.5, px:6, bgcolor: 'rgb(220 38 38)', '&:hover': { bgcolor: 'rgb(185 28 28)' }}}>
          {isPlacingOrder ? <CircularProgress size={24} color="inherit"/> : 'Hoàn tất đặt hàng'}
        </MuiButton>
      </div>
    </div>
  );

  const CompleteStep = () => {
    const orderDetails = orderFromContext; // Lấy order đã fetch từ context

    // Xử lý gửi mail và clear cart cho COD ở đây, chỉ một lần
    useEffect(() => {
        if (orderDetails && orderDetails.paymentMethod === "COD" && orderDetails.id === processedOrderId && !emailSentRef.current) {
            const completeCODOrder = async () => {
                try {
                    await clearCart(); // Xóa cart từ context và backend
                    await orderService.sendOrderToEmail(orderDetails.id);
                    emailSentRef.current = true; // Đánh dấu đã xử lý
                } catch (err) {
                    console.error("Lỗi khi hoàn tất đơn COD:", err);
                    showToast("Có lỗi xảy ra khi hoàn tất đơn hàng COD.", "error");
                }
            };
            completeCODOrder();
        }
    }, [orderDetails, processedOrderId, clearCart, showToast]);


    if (vnpayStatus === 'processing' || (isLoading && !orderDetails && !orderError)) {
        return (
            <Box sx={{ textAlign: 'center', py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress size={50} />
                <Typography variant="h6" sx={{ mt: 2 }}>{vnpayMessage || "Đang tải thông tin đơn hàng..."}</Typography>
            </Box>
        );
    }
    if (vnpayStatus === 'failed') {
         return (
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 'bold', color: 'error.main' }}>Thanh toán thất bại</Typography>
                <Typography sx={{ mb: 3, color: 'text.secondary' }}>{vnpayMessage || "Đã có lỗi xảy ra với thanh toán VNPAY."}</Typography>
                <MuiButton variant="outlined" onClick={() => navigate('/my-order')}>Xem đơn hàng</MuiButton>
            </Box>
        );
    }
    if (orderError && !orderDetails) {
         return (
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" color="error" gutterBottom>Không thể tải thông tin đơn hàng</Typography>
                <Typography sx={{mb:2}}>{orderError}</Typography>
                <MuiButton variant="outlined" onClick={() => fetchOrderByIdContext(processedOrderId)}>Thử lại</MuiButton>
            </Box>
        );
    }
    if (!orderDetails && vnpayStatus !== 'success') { // Nếu không phải VNPAY success và không có orderDetails
        return <Typography sx={{textAlign: 'center', py: 10}}>Không tìm thấy thông tin đơn hàng #{processedOrderId}.</Typography>;
    }

    // Hiển thị khi là VNPAY success hoặc COD (orderDetails đã có)
    return (
      <div className="text-center py-10 bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-2xl mx-auto">
        <div className="mb-6">
          {(vnpayStatus === 'success' || orderDetails?.paymentMethod === 'COD') && (
            <svg className="mx-auto mb-4 h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
            {vnpayStatus === 'success' ? "Thanh toán VNPAY thành công!" : "Đặt hàng thành công!"}
          </h2>
          <p className="text-lg text-gray-600 mb-6">Cảm ơn bạn đã đặt hàng tại Tech Shop.</p>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 text-left space-y-3 text-sm sm:text-base">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Thông tin đơn hàng #{processedOrderId}</h3>
            <p><strong>Ngày đặt:</strong> {orderDetails?.orderDate ? new Date(orderDetails.orderDate).toLocaleString('vi-VN') : "Đang cập nhật..."}</p>
            <p><strong>Phương thức:</strong> {orderDetails?.paymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : (orderDetails?.paymentMethod || "VNPAY")}</p>
            <p><strong>Địa chỉ giao:</strong> {`${orderDetails?.shippingAddress?.street || ''}, ${orderDetails?.shippingAddress?.ward || ''}, ${orderDetails?.shippingAddress?.district || ''}, ${orderDetails?.shippingAddress?.province || ''}`}</p>
            <p className="font-bold"><strong>Tổng tiền:</strong> <span className="text-red-600">{orderDetails ? formatCurrency(orderDetails.totalDiscountedPrice) : "Đang cập nhật..."}</span></p>
          </div>
          <p className="mb-8 text-gray-600">Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <MuiButton variant="contained" color="primary" onClick={() => navigate('/')} sx={{ py: 1.5, px: 5 }}>TIẾP TỤC MUA SẮM</MuiButton>
            <MuiButton variant="outlined" color="primary" onClick={() => navigate('/my-order')} sx={{ py: 1.5, px: 5 }}>XEM ĐƠN HÀNG</MuiButton>
          </div>
        </div>
      </div>
    );
  };


  // Main Render
  if (step < 2 && !location.pathname.endsWith('/cart')) {
    return <div className="text-center py-10">Đang chuyển hướng đến giỏ hàng...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          {step === 2 ? "Thông tin đặt hàng" : step === 3 ? "Thanh Toán" : step === 4 ? "Hoàn tất đơn hàng" : "Thanh Toán"}
        </h1>
        <CheckoutProgress />
        {orderError && step < 4 && <Alert severity="error" sx={{mb: 2}} onClose={clearOrderError}>{orderError}</Alert>}

        {step === 2 && (
          <AddressStep
            savedAddresses={savedAddressesContext || []}
            selectedAddress={selectedAddress}
            handleAddressSelect={handleAddressSelect}
            shippingInfo={shippingInfo}
            handleShippingChange={handleShippingChange}
            selectedProvinceId={selectedProvinceId}
            selectedDistrictId={selectedDistrictId}
            selectedWardId={selectedWardId}
            handleProvinceChange={handleProvinceChange}
            handleDistrictChange={handleDistrictChange}
            handleWardChange={handleWardChange}
            provinces={provinces}
            districts={districts}
            wards={wards}
            isLoadingProvinces={isLoadingProvinces}
            isLoadingDistricts={isLoadingDistricts}
            isLoadingWards={isLoadingWards}
            handlePrevStep={handlePrevStep}
            onAddAddressAndContinue={handleAddAddressAndContinue} // Thay đổi tên prop
            handleNextStep={handleNextStep} // Prop để đi tiếp nếu đã chọn địa chỉ
            isAddingAddress={isOrderLoading} // Sử dụng isLoading từ context cho việc thêm địa chỉ
          />
        )}
        {step === 3 && <PaymentStep />}
        {step === 4 && <CompleteStep />}
      </div>
    </div>
  );
};

export default Checkout;