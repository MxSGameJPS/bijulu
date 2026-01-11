import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Coluna 1: Sobre */}
        <div className={`${styles.column} ${styles.logoColumn}`}>
          <Image
            src="/logo.png"
            alt="Bijulu"
            width={150}
            height={50}
            style={{ objectFit: "contain" }}
          />
          <p>
            Sua loja de joias, maquiagens e acessórios exclusivos. Realçando sua beleza com
            peças únicas e de alta qualidade.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Coluna 2: Institucional */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Institucional</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/sobre">Sobre Nós</Link>
            </li>
            <li>
              <Link href="/contato">Fale Conosco</Link>
            </li>
            <li>
              <Link href="/politica-privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/termos-uso">Termos de Uso</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Ajuda */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Ajuda</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/trocas-devolucoes">Trocas e Devoluções</Link>
            </li>
            <li>
              <Link href="/prazos-entrega">Prazos e Entregas</Link>
            </li>
            <li>
              <Link href="/faq">Perguntas Frequentes</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Contato e Pagamento */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Atendimento</h3>
          <ul className={styles.linkList}>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaWhatsapp size={18} /> (11) 99999-9999
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={18} /> contato@bijulu.com.br
            </li>
            <li
              style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
            >
              <MapPin size={18} style={{ marginTop: "3px", flexShrink: 0 }} />
              <span>
                Rua das Flores, 123 - Centro
                <br />
                São Paulo - SP
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>
          &copy; {new Date().getFullYear()} BijuLu Joias e Acessórios. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}
