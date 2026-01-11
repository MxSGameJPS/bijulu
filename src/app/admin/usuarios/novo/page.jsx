import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { createUserAction } from "./action";

export default function NovoUsuarioPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Novo Usuário</h1>
        <Link
          href="/admin/usuarios"
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
        <form
          action={createUserAction}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "500px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Login *
            </label>
            <input
              type="text"
              name="login"
              required
              placeholder="Ex: joao.silva"
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#1a1a1a",
                color: "white",
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Senha *
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="******"
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#1a1a1a",
                color: "white",
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Confirmar Senha *
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="******"
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#1a1a1a",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              backgroundColor: "#fa90f0",
              color: "white",
              padding: "1rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              marginTop: "1rem",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1rem",
            }}
          >
            <Save size={20} />
            Salvar Usuário
          </button>
        </form>
      </div>
    </div>
  );
}
