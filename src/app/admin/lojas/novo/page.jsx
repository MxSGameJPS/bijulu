import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import styles from "../../../../styles/AdminDashboard.module.css";
import { createStoreAction } from "./action";

export default function NovaLojaPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Nova Loja Física</h1>
        <Link
          href="/admin/lojas"
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
          action={createStoreAction}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Nome da Loja *
            </label>
            <input
              type="text"
              name="nome"
              required
              placeholder="Ex: Bijulu Centro"
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
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                placeholder="Ex: São Paulo"
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
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                placeholder="Rua..."
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  background: "#1a1a1a",
                  color: "white",
                }}
              />
            </div>
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
            Salvar Loja
          </button>
        </form>
      </div>
    </div>
  );
}
