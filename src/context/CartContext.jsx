"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isDidMount, setIsDidMount] = useState(false);

  // Carregar do LocalStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("bijulu_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao ler carrinho", e);
      }
    }
    setIsDidMount(true);
  }, []);

  // Salvar no LocalStorage sempre que mudar
  useEffect(() => {
    if (isDidMount) {
      localStorage.setItem("bijulu_cart", JSON.stringify(cart));
    }
  }, [cart, isDidMount]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // Se já existe, aumenta a quantidade
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona com quantidade 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
