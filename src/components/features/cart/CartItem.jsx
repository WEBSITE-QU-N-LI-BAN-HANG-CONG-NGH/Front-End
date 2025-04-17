import React, { useState } from "react";
import { useCart } from "../../../hooks/useCart";

const CartItem = ({ id, name, price, originalPrice, image }) => {
  const { removeFromCart, updateCartItem, loading } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
    updateCartItem(id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <article className="flex justify-between items-center p-6 mb-4 border border-gray-300">
      <div className="flex gap-6 items-center">
        <img
          src={image}
          alt={name}
          className="w-[120px] h-[120px] object-contain"
        />
        <div>
          <h3 className="mb-2 text-base font-medium">{name}</h3>
          <button 
            className="text-sm text-stone-500"
            onClick={handleRemove}
            disabled={loading}
          >
            Xoá
          </button>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="text-2xl font-semibold text-red-600">{price}</div>
        <div className="text-base line-through text-stone-500">
          {originalPrice}
        </div>
        <div className="flex items-center rounded border border-gray-300">
          <button
            className="px-3 py-2 text-base"
            onClick={() => handleQuantityChange(-1)}
            disabled={loading}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            className="w-10 text-center border border-gray-300"
            readOnly
          />
          <button
            className="px-3 py-2 text-base"
            onClick={() => handleQuantityChange(1)}
            disabled={loading}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartItem;