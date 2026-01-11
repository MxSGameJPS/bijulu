import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./Header.module.css";
import { prisma } from "../../lib/prisma";
import CartIcon from "./CartIcon";

import MobileNav from "./MobileNav";

export default async function Header() {
  const categories = await prisma.categoria.findMany({
    orderBy: {
      nomeCategoria: "asc",
    },
  });

  // Serializar para Client Component
  const serializableCategories = categories.map((c) => ({
    ...c,
    id: c.id.toString(),
  }));

  return (
    <header className={styles.headerWrapper}>
      <MobileNav categories={serializableCategories} />
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Bijulu Logo"
              width={450}
              height={150}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        <div className={styles.socials}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className={styles.socialIcon} size={24} />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className={styles.socialIcon} size={24} />
          </a>
          <CartIcon />
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {categories.map((category) => (
            <li className={styles.navItem} key={category.id.toString()}>
              <Link href={`/categoria/${category.id}`}>
                {category.nomeCategoria}
              </Link>
            </li>
          ))}
          {/* Fallback apenas para visualização se não houver categorias no banco ainda */}
          {categories.length === 0 && (
            <>
              <li className={styles.navItem}>
                <Link href="#">Sem Categorias</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
