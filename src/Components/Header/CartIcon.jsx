"use client";

import { useCart } from "../../context/CartContext";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.cartIconWrapper}>
        <ShoppingBag className={styles.socialIcon} size={24} />
      </div>
    );
  }

  return (
    <Link
      href="/sacola"
      className={styles.cartIconWrapper}
      aria-label="Sacola de Compras"
    >
      <ShoppingBag className={styles.socialIcon} size={24} />
      {cartCount > 0 && (
        <span className={styles.cartCountBadge}>{cartCount}</span>
      )}
    </Link>
  );
}
