import { api } from "../config/ApiConfig";
import { API_BASE_URL } from "../config/ApiConfig";


export const orderService = {
    createOrder: (addressId) => 
        api.post(`/orders/create/${addressId}`),
    
    getOrderById: (orderId) => 
        api.get(`/orders/${orderId}`),
    
    getAddresses: () => 
        api.get("/users/address"),
    
    addAddress: (addressData) => 
        api.post("users/addresses", addressData),

    createVNPayPayment: (orderId) => 
        api.post(`/payment/create/${orderId}`),

    // Hàm gọi API callback VNPAY (POST /api/v1/payment/vnpay-callback)
    handleVNPayCallback: (vnpayParams) => {
        if (!vnpayParams) {
             return Promise.reject(new Error("VNPAY parameters are required for callback"));
        }
        return api.post(`/payment/vnpay-callback`, null, {
            params: vnpayParams  // Correctly send as query params
          });
    },

    getAllOrders: () => 
        api.get("/orders/user"),

    getPendingOrders: () => 
        api.get("/orders/pending"),

    getShippingOrders: () =>
        api.get("/orders/shipped"),

    getDeliveredOrders: () =>
        api.get("/orders/delivered"),

    getCancelledOrders: () =>
        api.get("/orders/cancelled"),

    getConfirmedOrders: () =>
        api.get("/orders/confirmed"),

    cancelOrder: (orderId) => 
        api.put(`/orders/cancel/${orderId}`),
};