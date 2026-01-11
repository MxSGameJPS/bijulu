"use client";

import { useCart } from "../../../context/CartContext";
import styles from "./ProductPage.module.css";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function ProductActions({ product, whatsappLink }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Feedback visual temporário
  };

  return (
    <div className={styles.actions}>
      {/* Botão Comprar (Ex: Adicionar ao Carrinho ou Link de Pagamento) */}
      <button
        className={styles.buyButton}
        onClick={handleAddToCart}
        style={added ? { backgroundColor: "green" } : {}}
      >
        <ShoppingBag size={20} />
        {added ? "Adicionado!" : "Adicionar à Sacola"}
      </button>

      {/* Botão WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
      >
        <MessageCircle size={20} />
        Comprar pelo Whats
      </a>
    </div>
  );
}
