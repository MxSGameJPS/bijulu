"use client";

import { useCart } from "../../context/CartContext";
import styles from "./SacolaPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, MessageCircle, ArrowLeft } from "lucide-react";
import { useMemo } from "react";

export default function SacolaPage() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const totalValue = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + Number(item.preco) * (item.quantity || 1);
    }, 0);
  }, [cart]);

  const handleCheckout = () => {
    // Montar mensagem do WhatsApp
    let message =
      "*Olá! Gostaria de finalizar meu pedido no site da Bijulu:*\n\n";

    cart.forEach((item) => {
      const subtotal = Number(item.preco) * (item.quantity || 1);
      message += `- *${item.quantity}x* ${item.nome}\n`;
      message += `  (R$ ${Number(item.preco)
        .toFixed(2)
        .replace(".", ",")} un.) -> R$ ${subtotal
        .toFixed(2)
        .replace(".", ",")}\n`;
    });

    message += `\n*Total do Pedido: R$ ${totalValue
      .toFixed(2)
      .replace(".", ",")}*\n\n`;
    message += "Aguardo a confirmação e dados para pagamento.";

    // Número do WhatsApp (Substituir pelo real)
    const phoneNumber = "5551993392983";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Redirecionar
    window.open(url, "_blank");
  };

  if (cartCount === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Minha Sacola</h1>
        <div className={styles.emptyState}>
          <p>Sua sacola está vazia.</p>
          <br />
          <Link
            href="/"
            style={{
              textDecoration: "underline",
              color: "var(--color-destaque)",
            }}
          >
            Voltar a comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minha Sacola</h1>

      <div className={styles.cartGrid}>
        {/* Lista de Itens */}
        <div className={styles.itemsList}>
          {cart.map((item) => {
            // Garante que o ID seja string e único para key
            const key = item.id.toString();
            const price = Number(item.preco);
            const qty = item.quantity || 1;

            return (
              <div key={key} className={styles.itemCard}>
                {/* Imagem */}
                <div className={styles.itemImageContainer}>
                  {item.imagemUrl ? (
                    <Image
                      src={item.imagemUrl}
                      alt={item.nome}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Sem foto
                    </div>
                  )}
                </div>

                {/* Infos */}
                <div className={styles.itemInfo}>
                  <Link
                    href={`/produto/${item.id}`}
                    className={styles.itemName}
                  >
                    {item.nome}
                  </Link>
                  <div className={styles.itemMeta}>
                    <span>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(price)}
                    </span>

                    {/* Controle de Quantidade */}
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        disabled={qty <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.qtyValue}>{qty}</span>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, qty + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal e Remover */}
                <div className={styles.itemActions}>
                  <div className={styles.itemPrice}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(price * qty)}
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={16} /> Remover
                  </button>
                </div>
              </div>
            );
          })}

          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#666",
              textDecoration: "none",
              marginTop: "1rem",
            }}
          >
            <ArrowLeft size={16} /> Continuar Comprando
          </Link>
        </div>

        {/* Resumo */}
        <div className={styles.summaryBox}>
          <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal ({cartCount} itens)</span>
            <span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalValue)}
            </span>
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span style={{ color: "var(--color-destaque)" }}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalValue)}
            </span>
          </div>

          <button className={styles.whatsappButton} onClick={handleCheckout}>
            <MessageCircle size={24} />
            Finalizar no WhatsApp
          </button>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#888",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Ao clicar, você será redirecionado para o WhatsApp com seu pedido
            pronto para enviar.
          </p>
        </div>
      </div>
    </div>
  );
}
