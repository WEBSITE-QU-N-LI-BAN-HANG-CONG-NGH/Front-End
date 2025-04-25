import {ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_FROM_CART_FAILURE, REMOVE_ITEM_FROM_CART_REQUEST, REMOVE_ITEM_FROM_CART_SUCCESS, UPDATE_ITEM_IN_CART_FAILURE, UPDATE_ITEM_IN_CART_REQUEST, UPDATE_ITEM_IN_CART_SUCCESS } from './ActionType';
import { cartService } from '../../services/cart.service';

export const getCart = () => async (dispatch) => {
    dispatch({type: GET_CART_REQUEST})

    try {
        const {data} = await cartService.getCart();
        console.log("Cart data from API:", data);
        dispatch({type: GET_CART_SUCCESS, payload: data})
    } catch (error) {
        console.error("Error fetching cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể tải giỏ hàng";
        dispatch({type: GET_CART_FAILURE, payload: errorMessage})
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: ADD_ITEM_TO_CART_REQUEST})

    try {
        const cartData = {
            productId: reqData.productId,
            size: reqData.size,
            quantity: reqData.quantity || 1
        };
        
        const {data} = await cartService.addToCart(cartData);
        console.log("Add to cart response:", data);
        dispatch({type: ADD_ITEM_TO_CART_SUCCESS, payload: data})
        return data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể thêm vào giỏ hàng";
        dispatch({type: ADD_ITEM_TO_CART_FAILURE, payload: errorMessage})
        throw error;
    }
}

export const removeItemToCart = (itemId) => async (dispatch) => {
    dispatch({type: REMOVE_ITEM_FROM_CART_REQUEST })
    try {
        const {data} = await cartService.removeFromCart(itemId);
        // Dispatch SUCCESS cho việc xóa item (reducer có thể dùng itemId để xóa khỏi state tạm thời)
        dispatch({type: REMOVE_ITEM_FROM_CART_SUCCESS, payload: data});
    } catch (error) {
        console.error("Error removing from cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể xóa sản phẩm khỏi giỏ hàng";
        dispatch({type: REMOVE_ITEM_FROM_CART_FAILURE, payload: errorMessage})
        throw error; // Ném lỗi để component có thể bắt nếu cần
    }
}

export const updateItemToCart = (reqData) => async (dispatch) => { // reqData là { itemId, quantity }
    dispatch({type: UPDATE_ITEM_IN_CART_REQUEST })
    try {
        const updateData = {
            quantity: reqData.quantity
        };
        // Gọi service với updateData và itemId
        const {data} = await cartService.updateCartItem(updateData, reqData.itemId);
        console.log("Update cart response:", data);
         // Dispatch SUCCESS cho việc cập nhật (reducer có thể dùng data mới để cập nhật state)
        dispatch({type: UPDATE_ITEM_IN_CART_SUCCESS, payload: data}); // Giả sử data trả về là cart mới hoặc cart item mới
    } catch (error) {
        console.error("Error updating cart:", error);
        const errorMessage = error.response?.data?.message || "Không thể cập nhật giỏ hàng";
        dispatch({type: UPDATE_ITEM_IN_CART_FAILURE, payload: errorMessage})
        throw error;
    }
}