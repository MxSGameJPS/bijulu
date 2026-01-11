"use client";

import { usePathname } from "next/navigation";

import { CartProvider } from "../../context/CartContext";

export default function ClientLayout({ children, header, footer }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <CartProvider>
      {!isAdmin && header}
      <main className={!isAdmin ? "" : "admin-main"}>{children}</main>
      {!isAdmin && footer}
    </CartProvider>
  );
}
