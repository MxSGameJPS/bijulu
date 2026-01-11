"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tag,
  Store,
  Users,
  LogOut,
} from "lucide-react";
import styles from "../../styles/AdminDashboard.module.css";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Produtos", path: "/admin/produtos", icon: Package },
    { name: "Categorias", path: "/admin/categorias", icon: Tag },
    { name: "Lojas", path: "/admin/lojas", icon: Store },
    { name: "Usuários", path: "/admin/usuarios", icon: Users },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.brandName}>BijuLu Admin</div>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navLink} ${
                isActive ? styles.activeLink : ""
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        className={styles.logoutButton}
        onClick={() => (window.location.href = "/")}
      >
        <LogOut size={20} />
        Sair
      </button>
    </aside>
  );
}
