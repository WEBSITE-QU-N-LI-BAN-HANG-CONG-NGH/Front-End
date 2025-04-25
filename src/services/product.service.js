import { api } from "../config/ApiConfig";
import axios from "axios";
import { API_BASE_URL } from "../config/ApiConfig";

export const productService = {
    getProductById: (productId) => 
        api.get(`${API_BASE_URL}/products/id/${productId}`),

    getAllProducts: () =>
        api.get(`${API_BASE_URL}/products/all`),

    getProductByTopCategory: (topCategory) =>
        api.get(`${API_BASE_URL}/products/${topCategory}`),

    getProductByTopCategoryAndSecondCategory: (topCategory, secondLevelCategory) =>
        api.get(`${API_BASE_URL}/products/${topCategory}/${secondLevelCategory}`),


    getProductByFilter: (filterPayload) => {
        const {
            topLevelCategory,
            secondLevelCategory,
            color,
            minPrice,
            maxPrice,
            sort,
            // Bỏ pageNumber, pageSize nếu backend không dùng
        } = filterPayload;

        // Xây dựng params cho Axios
        const params = {
            topLevelCategory: topLevelCategory || undefined,
            secondLevelCategory: secondLevelCategory || undefined,
            color: color || undefined,
            minPrice: minPrice ?? undefined, // Gửi nếu là số
            maxPrice: maxPrice ?? undefined,
            sort: sort || undefined,
        };

        // Loại bỏ các key undefined
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        console.log("Calling API: GET /products/ with Query Params:", params);
        // Gọi API với params trong config
        return api.get(`${API_BASE_URL}/products/`, { params }); // Axios sẽ tự chuyển thành query string
    },

    getProductBySearch: (search) =>
        api.get(`${API_BASE_URL}/products/search/${search}`),


    getSecondCategory: (topCategory) =>
        api.get(`${API_BASE_URL}/categories/${topCategory}`),

};

