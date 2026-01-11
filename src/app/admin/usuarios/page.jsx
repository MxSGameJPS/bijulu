import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { Plus, Search, User, Edit } from "lucide-react";
import styles from "../../../styles/AdminDashboard.module.css";
import { deleteUser } from "./actions";
import DeleteButton from "@/components/Admin/DeleteButton";

export default async function UsuariosPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  const users = await prisma.usuario.findMany({
    where: {
      login: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      login: "asc",
    },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Usuários</h1>
        <Link
          href="/admin/usuarios/novo"
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
          Novo Usuário
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
            placeholder="Buscar usuário..."
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
              <th>Login</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id.toString()}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <User size={18} color="#aaa" />
                    <span style={{ fontWeight: "bold" }}>{user.login}</span>
                  </div>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString("pt-BR")}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                      href={`/admin/usuarios/${user.id}`}
                      style={{ color: "#4facfe", padding: "0.5rem" }}
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteButton
                      id={user.id.toString()}
                      onDeleteAction={deleteUser}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#777",
                  }}
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
