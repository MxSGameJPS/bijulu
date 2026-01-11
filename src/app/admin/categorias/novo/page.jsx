import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { createCategoryAction } from "./action";
import CategoryForm from "./CategoryForm";

export default function NovoCategoriaPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Nova Categoria</h1>
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
        <CategoryForm action={createCategoryAction} />
      </div>
    </div>
  );
}
