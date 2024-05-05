"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartItemsFromStorage =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cartItemsFromStorage);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavBar />
      <div className="max-w-2xl mt-8">
        <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
        {cartItems.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border-b-2 border-gray-200 py-2"
              >
                <p className="font-bold">{item.name}</p>
                <p>Quantidade: {item.quantity}</p>
                <p>Preço unitário: R$ {item.price}</p>
                <p>
                  Total: R${" "}
                  {(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md"
                  onClick={() => removeFromCart(index)}
                >
                  Remover
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p className="font-bold">Total: R$ {totalPrice.toFixed(2)}</p>
              <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
                Comprar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
