import { prisma } from "../../../lib/prisma";
import styles from "./CategoryPage.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage(props) {
  const params = await props.params;
  const { id } = params;

  // 1. Fetch Categoria
  const category = await prisma.categoria.findUnique({
    where: { id: BigInt(id) },
  });

  if (!category) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.emptyState}>
          <h2>Categoria não encontrada</h2>
          <Link
            href="/"
            style={{
              color: "var(--color-destaque)",
              marginTop: "1rem",
              display: "inline-block",
            }}
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  // 2. Fetch Produtos da Categoria
  const products = await prisma.produto.findMany({
    where: {
      categoriaId: BigInt(id),
      quantidadeEstoque: { gt: 0 }, // Mostrar apenas produtos em estoque? Opcional
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className={styles.pageContainer}>
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        <ArrowLeft size={18} /> Voltar
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>{category.nomeCategoria}</h1>
        {category.descricaoCategoria && (
          <p className={styles.description}>{category.descricaoCategoria}</p>
        )}
      </div>

      {products.length > 0 ? (
        <div className={styles.grid}>
          {products.map((product) => {
            // Serializar BigInt/Decimal se necessário, mas Server Components podem renderizar Client Components (ProductCard)
            // O ProductCard espera { id: string, preco: Decimal|string, ... }
            // Vamos converter para garantir
            const serializableProduct = {
              ...product,
              id: product.id.toString(),
              preco: product.preco.toString(),
              categoriaId: product.categoriaId?.toString(),
              lojaId: product.lojaId?.toString(),
            };

            return (
              <ProductCard
                key={product.id.toString()}
                product={serializableProduct}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Nenhum produto encontrado nesta categoria no momento.</p>
        </div>
      )}
    </div>
  );
}
