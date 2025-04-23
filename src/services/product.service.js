import { api } from "../config/ApiConfig";
import axios from "axios";
import { API_BASE_URL } from "../config/ApiConfig";

export const productService = {
    getProducts: (reqData) => {
        const {
            colors = [],
            sizes = [],
            minPrice,
            maxPrice,
            minDiscount,
            category,
            stock,
            sort,
            pageNumber,
            pageSize
        } = reqData || {};

        return api.get('/api/products', {
            params: {
                colorsStr: colors.length > 0 ? colors.join(',') : null,
                sizesStr: sizes.length > 0 ? sizes.join(',') : null,
                minPrice,
                maxPrice,
                minDiscount,
                category,
                stock,
                sort,
                pageNumber,
                pageSize
            }
        });
    },
    
    getProductById: (productId) => 
        api.get(`${API_BASE_URL}/products/id/${productId}`),

    getAllProducts: () =>
        api.get(`${API_BASE_URL}/products/all`),

    getProductByTopCategory: (topCategory) =>
        api.get(`${API_BASE_URL}/products/${topCategory}`),

    getProductByTopCategoryAndSecondCategory: (topCategory, secondLevelCategory) =>
        api.get(`${API_BASE_URL}/products/${topCategory}/${secondLevelCategory}`),


    // http://localhost:8080/api/v1/products/?minPrice=100000&maxPrice=5000000&minDiscount=2&sort=price_low
    getProductByFilter: (minPrice, maxPrice, minDiscount, sort) =>
        api.get(`${API_BASE_URL}/products/`, {
            params: {
                minPrice,
                maxPrice,
                minDiscount,
                sort
            }
        }),

    getProductBySearch: (search) =>
        api.get(`${API_BASE_URL}/products/search/${search}`),


    getSecondCategory: (topCategory) =>
        api.get(`${API_BASE_URL}/categories/${topCategory}`),

};

