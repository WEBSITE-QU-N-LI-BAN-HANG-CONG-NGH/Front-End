import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, addItemToCart, removeItemToCart, updateItemToCart } from "../State/Cart/Action";

export const useCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    
    return {
        cart: cart.cart,
        loading: cart.loading,
        error: cart.error,
        addToCart: (productId, quantity, size) => 
            dispatch(addItemToCart({ productId, quantity, size })),
        removeFromCart: (itemId) => 
            dispatch(removeItemToCart(itemId)),
        updateCartItem: (itemId, quantity) => 
            dispatch(updateItemToCart({ itemId, quantity }))
    };
};