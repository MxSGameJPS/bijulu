"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function MobileNav({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.mobileNavWrapper}>
      <button
        className={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-label="Abrir Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay Backdrop */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      />

      {/* Menu Overlay / Drawer */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuHeader}>
          {/* <span className={styles.menuTitle}>Menu</span> Removido a pedido */}
          <div style={{ flex: 1 }}></div>{" "}
          {/* Espaçador para jogar o X para a direita */}
          <button onClick={toggleMenu} className={styles.closeButton}>
            <X size={28} />
          </button>
        </div>
        <nav className={styles.mobileNavList}>
          {categories.map((category) => (
            <Link
              key={category.id.toString()}
              href={`/categoria/${category.id}`}
              className={styles.mobileNavLink}
              onClick={toggleMenu} // Fecha ao clicar
            >
              {category.nomeCategoria}
            </Link>
          ))}
          {categories.length === 0 && (
            <span className={styles.mobileNavLink}>Sem categorias</span>
          )}
        </nav>
      </div>
    </div>
  );
}
