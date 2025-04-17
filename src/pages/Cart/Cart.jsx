import React from "react";
import { useCart } from "../../hooks/useCart";
import CartProgress from "../../components/features/cart/CartProgress";
import CartItem from "../../components/features/cart/CartItem";
import CartSummary from "../../components/features/cart/CartSummary";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";

const Cart = () => {
  const { cart, loading } = useCart();
  
  // Sample cart items if real cart is not available
  const sampleCartItems = [
    {
      id: 1,
      name: "Macbook Pro 14 M2 Pro 10CPU 16GPU 16GB 512GB Silver - MPHH3SA/A",
      price: "48.590.000đ",
      originalPrice: "52.990.000đ",
      image: "/Placeholder1.png",
      quantity: 1
    },
    {
      id: 2,
      name: "Card màn hình ASUS TUF Gaming GeForce RTX 4070 Ti SUPER BTF White OC Edition 16GB GDDR6X",
      price: "29.490.000đ",
      originalPrice: "31.990.000đ",
      image: "/Placeholder1.png",
      quantity: 1
    },
  ];
  
  // Use real cart items if available, otherwise use sample items
  const cartItems = cart?.cartItems || sampleCartItems;
  
  // Calculate total price (for sample items)
  const calculateTotal = () => {
    if (cart?.totalPrice) return cart.totalPrice;
    
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + price * item.quantity;
    }, 0).toLocaleString('vi-VN') + 'đ';
  };

  return (
    <main className="flex flex-col pt-3 bg-white min-h-[screen]">
      <section className="flex flex-col items-center px-64 py-10 max-md:px-10 max-sm:px-5">
        <BreadcrumbNav />
        <h1 className="mb-10 text-6xl font-semibold">Shopping Cart</h1>
        <CartProgress />
        
        {loading ? (
          <div className="w-full py-10 text-center">
            <p>Đang tải giỏ hàng...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="w-full py-10 text-center">
            <p>Giỏ hàng của bạn đang trống</p>
            <a href="/" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded">
              Tiếp tục mua sắm
            </a>
          </div>
        ) : (
          <div className="w-full">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <CartSummary total={calculateTotal()} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;