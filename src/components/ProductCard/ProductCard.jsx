"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  // Calcular parcelamento (ex: 3x sem juros)
  // Se preco vier como string/Decimal, garantir Number
  const price = Number(product.preco) || 0;
  const installmentCount = 3;
  const installmentValue = (price / installmentCount).toFixed(2);

  return (
    <Link href={`/produto/${product.id}`} className={styles.card}>
      {product.ehLancamento && <div className={styles.badge}>Novidade</div>}

      <div
        className={styles.wishlist}
        onClick={(e) => {
          e.preventDefault(); // Evitar abrir o link
          // Todo: Implement Wishlist
          console.log("Wishlist", product.id);
        }}
      >
        <Heart size={18} />
      </div>

      <div className={styles.imageWrapper}>
        {product.imagemUrl ? (
          <Image
            src={product.imagemUrl}
            alt={product.nome}
            fill
            className={styles.image}
            sizes="(max-width: 600px) 100vw, 25vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              fontSize: "0.8rem",
            }}
          >
            Sem Foto
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{product.nome}</h3>
        <div className={styles.price}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}
        </div>
        <div className={styles.installments}>
          {installmentCount}x de R$ {installmentValue.replace(".", ",")}
        </div>
      </div>
    </Link>
  );
}
