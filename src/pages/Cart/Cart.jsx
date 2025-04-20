import React from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbNav from "../../components/layout/BreadcrumbNav";
import { useSimpleCart } from "../../hooks/useSimpleCart";

const CartItem = ({ item, removeFromCart, updateQuantity, formatCurrency }) => {
  return (
    <article className="flex justify-between items-center p-6 mb-4 border border-gray-300">
      <div className="flex gap-6 items-center">
        <img
          src={item.product?.imageUrl || "/Placeholder2.png"}
          alt={item.product?.title || "Sản phẩm"}
          className="w-[120px] h-[120px] object-contain"
        />
        <div>
          <h3 className="mb-2 text-base font-medium">{item.product?.title || "Sản phẩm"}</h3>
          <button 
            className="text-sm text-stone-500"
            onClick={() => removeFromCart(item.id)}
          >
            Xoá
          </button>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="text-2xl font-semibold text-red-600">
          {formatCurrency(item.price)}
        </div>
        {item.product?.discountPercent > 0 && (
          <div className="text-base line-through text-stone-500">
            {formatCurrency(item.price / (1 - item.product.discountPercent / 100))}
          </div>
        )}
        <div className="flex items-center rounded border border-gray-300">
          <button
            className="px-3 py-2 text-base"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input
            type="text"
            value={item.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0) {
                updateQuantity(item.id, value);
              }
            }}
            className="w-10 text-center border-x border-gray-300"
          />
          <button
            className="px-3 py-2 text-base"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

const CartSummary = ({ totalPrice, checkout, formatCurrency }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base">Phí vận chuyển:</p>
        <p className="text-base text-green-600">Miễn phí</p>
      </div>
      <div className="flex justify-between items-center p-6 mb-6 border border-gray-300">
        <p className="text-base font-medium">Tổng tiền:</p>
        <p className="text-2xl font-semibold text-red-600">{formatCurrency(totalPrice)}</p>
      </div>
      <button 
        className="py-4 w-full text-base font-semibold text-white bg-rose-600 rounded hover:bg-rose-700 transition-colors"
        onClick={checkout}
      >
        ĐẶT HÀNG NGAY
      </button>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, checkout, formatCurrency, isLoading } = useSimpleCart();
  
  return (
    <main className="flex flex-col pt-3 bg-white min-h-screen">
      <section className="flex flex-col items-center px-4 md:px-10 lg:px-64 py-10 max-md:px-10 max-sm:px-5">
        <BreadcrumbNav />
        <h1 className="mb-10 text-4xl md:text-6xl font-semibold">Shopping Cart</h1>
        
        <div className="flex justify-between mb-10 w-full">
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-blue-600 rounded-full flex items-center justify-center">
              1
            </div>
            <div className="ml-2 text-sm font-medium">Giỏ hàng</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-gray-300 rounded-full flex items-center justify-center">
              2
            </div>
            <div className="ml-2 text-sm font-medium">Thông tin đặt hàng</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-gray-300 rounded-full flex items-center justify-center">
              3
            </div>
            <div className="ml-2 text-sm font-medium">Thanh toán</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 font-semibold text-white bg-gray-300 rounded-full flex items-center justify-center">
              4
            </div>
            <div className="ml-2 text-sm font-medium">Hoàn tất</div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="w-full py-10 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4">Đang tải giỏ hàng...</p>
          </div>
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          <div className="w-full py-10 text-center">
            <p className="text-lg mb-6">Giỏ hàng của bạn đang trống</p>
            <button 
              className="py-3 px-6 text-base font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/')}
            >
              TIẾP TỤC MUA SẮM
            </button>
          </div>
        ) : (
          <div className="w-full">
            {cart.items.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity}
                formatCurrency={formatCurrency}
              />
            ))}
            <CartSummary 
              totalPrice={cart.totalDiscountedPrice || cart.totalPrice} 
              checkout={checkout}
              formatCurrency={formatCurrency}
            />
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;