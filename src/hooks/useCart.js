import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, addItemToCart, removeItemToCart, updateItemToCart } from "../State/Cart/Action";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart) || { loading: false, error: null, cart: null };
  const [localLoading, setLocalLoading] = useState(false);
  
  // Safe wrapper for cart actions
  const safeDispatch = (action) => {
    try {
      return dispatch(action);
    } catch (error) {
      console.error("Error dispatching cart action:", error);
      return null;
    }
  };
  
  useEffect(() => {
    // Only try to fetch cart if Redux is properly set up
    try {
      dispatch(getCart());
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [dispatch]);
  
  return {
    cart: cartState.cart,
    loading: cartState.loading || localLoading,
    error: cartState.error,
    
    addToCart: (productId, quantity, size) => {
      setLocalLoading(true);
      try {
        const result = safeDispatch(addItemToCart({ productId, quantity, size }));
        console.log(`Added product ${productId} to cart`);
        return result;
      } catch (error) {
        console.error("Error adding to cart:", error);
        return null;
      } finally {
        setLocalLoading(false);
      }
    },
    
    removeFromCart: (itemId) => {
      setLocalLoading(true);
      try {
        const result = safeDispatch(removeItemToCart(itemId));
        console.log(`Removed item ${itemId} from cart`);
        return result;
      } catch (error) {
        console.error("Error removing from cart:", error);
        return null;
      } finally {
        setLocalLoading(false);
      }
    },
    
    updateCartItem: (itemId, quantity) => {
      setLocalLoading(true);
      try {
        const result = safeDispatch(updateItemToCart({ itemId, quantity }));
        console.log(`Updated item ${itemId} quantity to ${quantity}`);
        return result;
      } catch (error) {
        console.error("Error updating cart item:", error);
        return null;
      } finally {
        setLocalLoading(false);
      }
    }
  };
};