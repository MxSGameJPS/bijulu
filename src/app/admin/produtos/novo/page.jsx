import { prisma } from "../../../../lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../../../../styles/AdminDashboard.module.css";
import ProductForm from "./ProductForm";
import { createProductAction } from "./action";

export default async function NovoProdutoPage() {
  // Buscar categorias e lojas para o dropdown
  const categorias = await prisma.categoria.findMany();
  const lojas = await prisma.loja.findMany();

  const serializableCategorias = categorias.map((c) => ({
    ...c,
    id: c.id.toString(),
  }));

  const serializableLojas = lojas.map((l) => ({
    ...l,
    id: l.id.toString(),
  }));

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Novo Produto</h1>
        <Link
          href="/admin/produtos"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#aaa",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>
      </div>

      <div
        style={{
          background: "#242424",
          padding: "2rem",
          borderRadius: "12px",
          color: "#fff",
          border: "1px solid #333",
        }}
      >
        <ProductForm
          categorias={serializableCategorias}
          lojas={serializableLojas}
          action={createProductAction}
        />
      </div>
    </div>
  );
}
