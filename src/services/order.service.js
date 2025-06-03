// src/services/order.service.js
import { api } from "../config/ApiConfig";
// import { API_BASE_URL } from "../config/ApiConfig"; // Không cần nếu api instance đã có baseURL

export const orderService = {
    createOrder: async (addressId) => { // Chỉ nhận addressId
        try {
            if (!addressId) {
                throw new Error("Address ID is required to create an order.");
            }
            // API endpoint của bạn là /orders/create/{addressId}
            const response = await api.post(`/orders/create/${addressId}`);
            return response; // Trả về response, Context sẽ lấy response.data
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng (Service):', error.response || error);
            throw error;
        }
    },

    getOrderById: async (orderId) => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            return response;
        } catch (error) {
            console.error(`Lỗi khi lấy đơn hàng ${orderId} (Service):`, error.response || error);
            throw error;
        }
    },

    getAddresses: async () => {
        try {
            const response = await api.get("/users/address");
            return response;
        } catch (error) {
            console.error('Lỗi khi lấy địa chỉ (Service):', error.response || error);
            throw error;
        }
    },

    addAddress: async (addressData) => {
        try {
            // API endpoint của bạn là users/addresses, không phải /api/user/addresses
            const response = await api.post("/users/addresses", addressData);
            return response;
        } catch (error) {
            console.error('Lỗi khi thêm địa chỉ (Service):', error.response || error);
            throw error;
        }
    },

    createVNPayPayment: async (orderId) => {
        try {
            // Backend endpoint: /payment/create/{orderId}
            const response = await api.post(`/payment/create/${orderId}`);
            return response;
        } catch (error) {
            console.error(`Lỗi khi tạo thanh toán VNPAY cho đơn ${orderId} (Service):`, error.response || error);
            throw error;
        }
    },

    handleVNPayCallback: async (vnpayParams) => {
        if (!vnpayParams) {
             return Promise.reject(new Error("VNPAY parameters are required for callback"));
        }
        try {
            // Body có thể là null nếu backend không yêu cầu body cho POST này
            const response = await api.post(`/payment/vnpay-callback`, null, { //
                params: vnpayParams
            });
            return response;
        } catch (error) {
            console.error('Lỗi khi xử lý VNPAY callback (Service):', error.response || error);
            throw error;
        }
    },

    getAllOrders: async () => {
        try {
            const response = await api.get("/orders/user"); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    getPendingOrders: async () => {
        try {
            const response = await api.get("/orders/pending"); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    getShippingOrders: async () => {
        try {
            const response = await api.get("/orders/shipped"); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    getDeliveredOrders: async () => {
        try {
            const response = await api.get("/orders/delivered"); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    getCancelledOrders: async () => {
        try {
            const response = await api.get("/orders/cancelled"); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    getConfirmedOrders: async () => {
        try {
            const response = await api.get("/orders/confirmed"); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    cancelOrder: async (orderId) => {
        try {
            const response = await api.put(`/orders/cancel/${orderId}`); //
            return response;
        } catch (error) {
            throw error;
        }
    },
    sendOrderToEmail: async (orderId) => {
        try {
            const response = await api.post(`/orders/send-mail/${orderId}`); //
            return response;
        } catch (error) {
            throw error;
        }
    },
};