import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { Plus, Search, Edit } from "lucide-react";
import styles from "../../../styles/AdminDashboard.module.css";
import { deleteCategory } from "./actions";
import DeleteButton from "@/components/Admin/DeleteButton";

export default async function CategoriasPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  const categories = await prisma.categoria.findMany({
    where: {
      nomeCategoria: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      _count: {
        select: { produtos: true },
      },
    },
    orderBy: {
      nomeCategoria: "asc",
    },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Categorias</h1>
        <Link
          href="/admin/categorias/novo"
          className="btn-primary"
          style={{
            backgroundColor: "#fa90f0",
            color: "white",
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: "bold",
          }}
        >
          <Plus size={20} />
          Nova Categoria
        </Link>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <form
          style={{ display: "flex", position: "relative", maxWidth: "400px" }}
        >
          <Search
            size={20}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#666",
            }}
          />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Buscar categoria..."
            style={{
              width: "100%",
              padding: "12px 12px 12px 40px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#242424",
              color: "white",
            }}
          />
        </form>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Imagem</th>
              <th>Qtd. Produtos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id.toString()}>
                <td style={{ fontWeight: "bold" }}>{cat.nomeCategoria}</td>
                <td style={{ color: "#aaa" }}>
                  {cat.descricaoCategoria || "-"}
                </td>
                <td>{cat.imagemUrl ? "Sim" : "Não"}</td>
                <td>{cat._count?.produtos || 0}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                      href={`/admin/categorias/${cat.id}`}
                      style={{ color: "#4facfe", padding: "0.5rem" }}
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteButton
                      id={cat.id.toString()}
                      onDeleteAction={deleteCategory}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#777",
                  }}
                >
                  Nenhuma categoria encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
