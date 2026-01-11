import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit } from "lucide-react";
import styles from "../../../styles/AdminDashboard.module.css";
import { deleteProduct } from "./actions";
import DeleteButton from "@/components/Admin/DeleteButton";

export default async function ProdutosPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";

  const products = await prisma.produto.findMany({
    where: {
      nome: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      categoria: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Produtos</h1>
        <Link
          href="/admin/produtos/novo"
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
          Novo Produto
        </Link>
      </div>

      <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem" }}>
        <form style={{ flex: 1, display: "flex", position: "relative" }}>
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
            placeholder="Buscar produto por nome..."
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
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id.toString()}>
                <td style={{ width: "60px" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      position: "relative",
                      borderRadius: "4px",
                      overflow: "hidden",
                      background: "#333",
                    }}
                  >
                    {product.imagemUrl ? (
                      <Image
                        src={product.imagemUrl}
                        alt={product.nome}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: "bold" }}>{product.nome}</div>
                  {product.ehLancamento && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        background: "#fa90f0",
                        padding: "2px 4px",
                        borderRadius: "2px",
                        color: "white",
                      }}
                    >
                      Lançamento
                    </span>
                  )}
                </td>
                <td>{product.categoria?.nomeCategoria || "-"}</td>
                <td>R$ {Number(product.preco).toFixed(2)}</td>
                <td>
                  <span
                    style={{
                      color:
                        product.quantidadeEstoque < 3 ? "#ff6347" : "#90ee90",
                      fontWeight: "bold",
                    }}
                  >
                    {product.quantidadeEstoque}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link
                      href={`/admin/produtos/${product.id}`}
                      style={{ color: "#4facfe", padding: "0.5rem" }}
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteButton
                      id={product.id.toString()}
                      onDeleteAction={deleteProduct}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#777",
                  }}
                >
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
