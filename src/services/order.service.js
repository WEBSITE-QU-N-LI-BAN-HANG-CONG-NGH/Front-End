import { api } from "./api";

export const orderService = {
    createOrder: (addressId) => 
        api.post(`/api/order/create/${addressId}`),
    
    getOrderById: (orderId) => 
        api.get(`/api/order/${orderId}`),
    
    getAddresses: () => 
        api.get("/api/user/address"),
    
    addAddress: (addressData) => 
        api.post("/api/user/addresses", addressData)
};