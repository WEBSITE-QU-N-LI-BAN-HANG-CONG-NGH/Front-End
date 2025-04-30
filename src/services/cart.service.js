import { api } from "../config/ApiConfig";
import { API_BASE_URL } from "../config/ApiConfig";

export const cartService = {

    getCart: () => 
        api.get(`${API_BASE_URL}/cart/`),
    
    addToCart: (cartData) => 
        api.post(`${API_BASE_URL}/cart/add`, cartData),
    
    removeFromCart: (itemId) => 
        api.delete(`${API_BASE_URL}/cart/remove/${itemId}`),
    
    updateCartItem: (cartUpdateData, itemId) => {
        console.log(`Updating cart item ${itemId} with data:`, cartUpdateData);
        return api.put(`${API_BASE_URL}/cart/update/${itemId}`, cartUpdateData); // Thêm /api/v1/ và gửi đúng body
    },

    clearCart: () => 
        api.delete(`${API_BASE_URL}/cart/clear`),
};