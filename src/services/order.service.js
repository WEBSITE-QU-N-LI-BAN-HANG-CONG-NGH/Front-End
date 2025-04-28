import { api } from "../config/ApiConfig";
import { API_BASE_URL } from "../config/ApiConfig";


export const orderService = {
    createOrder: (addressId) => 
        api.post(`/orders/create/${addressId}`),
    
    getOrderById: (orderId) => 
        api.get(`/api/order/${orderId}`),
    
    getAddresses: () => 
        api.get("/users/address"),
    
    addAddress: (addressData) => 
        api.post("users/addresses", addressData)
};