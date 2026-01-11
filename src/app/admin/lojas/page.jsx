import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { Plus, Search, MapPin, Edit } from "lucide-react";
import styles from "../../../styles/AdminDashboard.module.css";
import { deleteStore } from "./actions";
import DeleteButton from "@/components/Admin/DeleteButton";

export default async function LojasPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  const stores = await prisma.loja.findMany({
    where: {
      nome: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Lojas Físicas</h1>
        <Link
          href="/admin/lojas/novo"
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
          Nova Loja
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
            placeholder="Buscar loja..."
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
              <th>Nome da Loja</th>
              <th>Cidade</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id.toString()}>
                <td style={{ fontWeight: "bold" }}>{store.nome}</td>
                <td>{store.cidade || "-"}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <MapPin size={16} color="#777" />
                    {store.endereco || "-"}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                      href={`/admin/lojas/${store.id}`}
                      style={{ color: "#4facfe", padding: "0.5rem" }}
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteButton
                      id={store.id.toString()}
                      onDeleteAction={deleteStore}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {stores.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#777",
                  }}
                >
                  Nenhuma loja encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
