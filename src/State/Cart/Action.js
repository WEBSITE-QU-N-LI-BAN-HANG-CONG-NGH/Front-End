import {ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_ITEM_FROM_CART_FAILURE, REMOVE_ITEM_FROM_CART_REQUEST, REMOVE_ITEM_FROM_CART_SUCCESS, UPDATE_ITEM_IN_CART_FAILURE, UPDATE_ITEM_IN_CART_REQUEST, UPDATE_ITEM_IN_CART_SUCCESS } from './ActionType';
import {api} from '../../config/ApiConfig';

export const getCart = () => async (dispatch) => {
    dispatch({type: GET_CART_REQUEST})

    try {
        // Kiểm tra xem có dữ liệu giỏ hàng trong localStorage không
        const savedCart = localStorage.getItem('cart');
        
        if (savedCart) {
            // Nếu có, sử dụng dữ liệu từ localStorage
            const data = JSON.parse(savedCart);
            console.log("Cart data from localStorage:", data);
            dispatch({type: GET_CART_SUCCESS, payload: data});
            return data;
        }

        // Nếu không, gọi API để lấy dữ liệu
        const {data} = await api.get('/api/cart/');
        console.log("Cart data from API:", data);
        
        // Lưu dữ liệu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(data));
        
        dispatch({type: GET_CART_SUCCESS, payload: data});
        return data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        
        // Nếu API gọi lỗi, tạo giỏ hàng trống và lưu vào localStorage
        const emptyCart = { cartItems: [], totalItems: 0, totalPrice: 0 };
        localStorage.setItem('cart', JSON.stringify(emptyCart));
        
        const errorMessage = error.response?.data?.message || "Không thể tải giỏ hàng";
        dispatch({type: GET_CART_FAILURE, payload: errorMessage});
        return emptyCart;
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: ADD_ITEM_TO_CART_REQUEST})

    try {
        // Kiểm tra dữ liệu đầu vào
        if (!reqData.productId) {
            throw new Error("Thiếu thông tin sản phẩm");
        }
        
        const cartData = {
            productId: reqData.productId,
            size: reqData.size,
            quantity: reqData.quantity || 1
        };
        
        // Khởi tạo cấu trúc mặc định cho giỏ hàng nếu chưa có
        let currentCart;
        try {
            const savedCart = localStorage.getItem('cart');
            currentCart = savedCart ? JSON.parse(savedCart) : null;
            
            // Kiểm tra cấu trúc giỏ hàng hợp lệ
            if (!currentCart || !currentCart.cartItems) {
                currentCart = {
                    cartItems: [],
                    totalItems: 0,
                    totalPrice: 0
                };
            }
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            currentCart = {
                cartItems: [],
                totalItems: 0,
                totalPrice: 0
            };
        }
        
        // Tìm sản phẩm trong giỏ hàng (nếu có)
        const existingItemIndex = currentCart.cartItems.findIndex(
            item => item.product && item.product.id === cartData.productId && item.size === cartData.size
        );
        
        // Mẫu dữ liệu sản phẩm (trong trường hợp thực tế sẽ lấy từ API)
        // Đây chỉ là dữ liệu mẫu, bạn cần thay thế bằng dữ liệu thực từ API
        const productData = {
            id: cartData.productId,
            title: "Sản phẩm " + cartData.productId,
            price: 999000,
            discountPercent: 0,
            imageUrl: "/Placeholder2.png"
        };
        
        let newCart;
        
        if (existingItemIndex >= 0) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            newCart = {...currentCart};
            newCart.cartItems[existingItemIndex].quantity += cartData.quantity;
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            const newItem = {
                id: Date.now(), // Tạo ID tạm thời
                product: productData,
                quantity: cartData.quantity,
                size: cartData.size,
                price: productData.price
            };
            
            newCart = {
                ...currentCart,
                cartItems: [...currentCart.cartItems, newItem]
            };
        }
        
        // Tính toán lại tổng số lượng và giá trị
        newCart.totalItems = newCart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        newCart.totalPrice = newCart.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
        
        // Thử gọi API (có thể bỏ qua nếu không cần thiết)
        try {
            const {data} = await api.post('/api/cart/add', cartData);
            console.log("Add to cart response:", data);
        } catch (apiError) {
            console.log("API error, using local cart only:", apiError);
        }
        
        // Trả về giỏ hàng đã cập nhật
        dispatch({type: ADD_ITEM_TO_CART_SUCCESS, payload: newCart});
        return newCart;
        
    } catch (error) {
        console.error("Error adding to cart:", error);
        const errorMessage = error.response?.data?.message || error.message || "Không thể thêm vào giỏ hàng";
        dispatch({type: ADD_ITEM_TO_CART_FAILURE, payload: errorMessage});
        throw error;
    }
}

export const removeItemToCart = (itemId) => async (dispatch) => {
    dispatch({type: REMOVE_ITEM_FROM_CART_REQUEST })

    try {
        // Khởi tạo cấu trúc mặc định cho giỏ hàng nếu chưa có
        let currentCart;
        try {
            const savedCart = localStorage.getItem('cart');
            currentCart = savedCart ? JSON.parse(savedCart) : null;
            
            // Kiểm tra cấu trúc giỏ hàng hợp lệ
            if (!currentCart || !currentCart.cartItems) {
                throw new Error("Giỏ hàng trống");
            }
        } catch (error) {
            throw new Error("Giỏ hàng không hợp lệ");
        }
        
        // Tìm vị trí của item cần xóa
        const itemIndex = currentCart.cartItems.findIndex(item => item.id === itemId);
        
        if (itemIndex === -1) {
            throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
        }
        
        // Tạo giỏ hàng mới không bao gồm item cần xóa
        const newCart = {
            ...currentCart,
            cartItems: currentCart.cartItems.filter(item => item.id !== itemId)
        };
        
        // Tính toán lại tổng số lượng và giá trị
        newCart.totalItems = newCart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        newCart.totalPrice = newCart.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
        
        // Thử gọi API (có thể bỏ qua nếu không cần thiết)
        try {
            const {data} = await api.delete(`/api/cart/remove/${itemId}`);
            console.log("Remove from cart response:", data);
        } catch (apiError) {
            console.log("API error, using local cart only:", apiError);
        }
        
        dispatch({type: REMOVE_ITEM_FROM_CART_SUCCESS, payload: itemId});
        return newCart;
        
    } catch (error) {
        console.error("Error removing from cart:", error);
        const errorMessage = error.response?.data?.message || error.message || "Không thể xóa sản phẩm khỏi giỏ hàng";
        dispatch({type: REMOVE_ITEM_FROM_CART_FAILURE, payload: errorMessage});
        throw error;
    }
}

export const updateItemToCart = (reqData) => async (dispatch) => {
    dispatch({type: UPDATE_ITEM_IN_CART_REQUEST })

    try {
        if (!reqData.itemId || !reqData.quantity) {
            throw new Error("Thiếu thông tin cần thiết");
        }
        
        // Khởi tạo cấu trúc mặc định cho giỏ hàng nếu chưa có
        let currentCart;
        try {
            const savedCart = localStorage.getItem('cart');
            currentCart = savedCart ? JSON.parse(savedCart) : null;
            
            // Kiểm tra cấu trúc giỏ hàng hợp lệ
            if (!currentCart || !currentCart.cartItems) {
                throw new Error("Giỏ hàng trống");
            }
        } catch (error) {
            throw new Error("Giỏ hàng không hợp lệ");
        }
        
        // Tìm vị trí của item cần cập nhật
        const itemIndex = currentCart.cartItems.findIndex(item => item.id === reqData.itemId);
        
        if (itemIndex === -1) {
            throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
        }
        
        // Tạo giỏ hàng mới với số lượng đã cập nhật
        const newCart = {...currentCart};
        newCart.cartItems[itemIndex] = {
            ...newCart.cartItems[itemIndex],
            quantity: reqData.quantity
        };
        
        // Tính toán lại tổng số lượng và giá trị
        newCart.totalItems = newCart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        newCart.totalPrice = newCart.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
        
        const updateData = {
            quantity: reqData.quantity
        };
        
        // Thử gọi API (có thể bỏ qua nếu không cần thiết)
        try {
            const {data} = await api.put(`/api/cart/update/${reqData.itemId}`, updateData);
            console.log("Update cart response:", data);
        } catch (apiError) {
            console.log("API error, using local cart only:", apiError);
        }
        
        dispatch({type: UPDATE_ITEM_IN_CART_SUCCESS, payload: newCart});
        return newCart;
        
    } catch (error) {
        console.error("Error updating cart:", error);
        const errorMessage = error.response?.data?.message || error.message || "Không thể cập nhật giỏ hàng";
        dispatch({type: UPDATE_ITEM_IN_CART_FAILURE, payload: errorMessage});
        throw error;
    }
}