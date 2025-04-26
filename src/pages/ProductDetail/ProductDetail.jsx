import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Thêm hook này
import ProductGallery from "../../components/features/product/ProductGallery";
import ProductInfo from "../../components/features/product/ProductInfo";
import ProductReviews from "../../components/features/product/ProductReviews";
import { productService } from "../../services/product.service";
import { Alert, CircularProgress, Typography } from "@mui/material";
import ReviewForm from "../../components/features/user/ReviewForm";

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId || productId === "undefined") {
      setError("Product ID is required");
      setLoading(false);
      return;
    }

    // Fetch product data
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(productId);
        console.log('productttttttt :>> ', data.data.data);
        setProduct(data.data.data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return  <>
    <CircularProgress size={60} thickness={4} />
    <Typography variant="h6" sx={{ mt: 4 }}>
      Đang tải sản phẩm... {/* Thay đổi text */}
    </Typography>
  </>
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ width: '100%', maxWidth: 500, marginTop: 2 }}
      >
        {error}. Tải sản phẩm không thành công.
      </Alert>
    )
  }

  return (
    <div className="flex overflow-hidden flex-col pt-3 bg-white">
      <main>
        <section className="flex gap-10 px-64 py-10 max-md:flex-col max-md:p-5">
          <ProductGallery item={product} />
          <ProductInfo item={product} />
        </section>
        <ReviewForm />
        <ProductReviews />
      </main>
    </div>
  );
};

export default ProductDetail;