import { api } from "./api";

export const cartService = {
    getCart: () => 
        api.get('/api/cart/'),
    
    addToCart: (cartData) => 
        api.post('/api/cart/add', {
            productId: cartData.productId,
            size: cartData.size,
            quantity: cartData.quantity || 1
        }),
    
    removeFromCart: (itemId) => 
        api.delete(`/api/cart/remove/${itemId}`),
    
    updateCartItem: (reqData) => 
        api.put(`/api/cart/update/${reqData.itemId}`, {
            quantity: reqData.quantity
        })
};