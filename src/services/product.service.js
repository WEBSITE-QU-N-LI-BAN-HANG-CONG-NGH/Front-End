import { api } from "./api";

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
        api.get(`/api/products/id/${productId}`)
};