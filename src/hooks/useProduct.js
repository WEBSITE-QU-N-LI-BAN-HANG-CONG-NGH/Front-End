import { useDispatch, useSelector } from "react-redux";
import { findProducts, findProductsById } from "../State/Product/Action";

export const useProduct = () => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    
    const getProducts = (params) => {
        dispatch(findProducts(params));
    };
    
    const getProductById = (productId) => {
        dispatch(findProductsById({ productId }));
    };
    
    return {
        products: product.products,
        product: product.product,
        loading: product.loading,
        error: product.error,
        getProducts,
        getProductById
    };
};