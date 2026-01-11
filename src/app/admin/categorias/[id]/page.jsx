import { prisma } from "../../../../lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { updateCategoryAction } from "./action";
import CategoryForm from "../novo/CategoryForm";

export default async function EditarCategoriaPage({ params }) {
  const { id } = await params;

  const category = await prisma.categoria.findUnique({
    where: { id: BigInt(id) },
  });

  if (!category) {
    return <div>Categoria não encontrada.</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Editar Categoria</h1>
        <Link
          href="/admin/categorias"
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
        <CategoryForm category={category} action={updateCategoryAction} />
      </div>
    </div>
  );
}
