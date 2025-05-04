import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productService } from "../../../services/product.service";

const formatPrice = (price) => {
  if (typeof price !== 'number') return "N/A";
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const FlashSale = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const filterPayload = {
        sort: "discount" || undefined,
      };
      const response = await productService.getProductByFilter(filterPayload);
      // Take only the first 5 products
      setProducts(response.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching flash sale products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Add empty dependency array to prevent infinite loop
  }, []);

  return (
    <div className="flex flex-col max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between ml-4 max-md:max-w-full">
        <div className="text-2xl mt-5 font-semibold text-center text-black">
          FLASH SALE
        </div>
        <a
          href="/product/all"
          className="my-auto text-sm leading-none text-right text-blue-600 underline underline-offset-auto">
          See All New Products
        </a>
      </div>
      <div className="flex flex-wrap mt-3.5 text-black max-md:max-w-full">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              image={product.imageUrls?.[0]?.downloadUrl || "/Placeholder2.png"}
              stockStatus={product.quantity > 0 ? "in stock" : "out of stock"}
              title={product.title}
              price={formatPrice(product.discountedPrice)}
              originalPrice={formatPrice(product.price)}
              reviewCount={product.numRatings || 0}
              discountPercent={product.discountPercent || 0}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default FlashSale;