import { prisma } from "../../../../lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "../../../../styles/AdminDashboard.module.css";
import ProductForm from "../novo/ProductForm";
import { updateProductAction } from "./action";

export default async function EditarProdutoPage({ params }) {
  const { id } = await params;

  const product = await prisma.produto.findUnique({
    where: { id: BigInt(id) },
  });

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  const categorias = await prisma.categoria.findMany();
  const lojas = await prisma.loja.findMany();

  // Serializar dados para o Client Component
  const serializableProduct = {
    ...product,
    id: product.id.toString(),
    preco: product.preco.toString(), // Converter Decimal para string
    categoriaId: product.categoriaId?.toString(),
    lojaId: product.lojaId?.toString(),
    // Datas são serializadas automaticamente pelo Next.js, mas BigInt/Decimal não
  };

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
        <h1 className={styles.pageTitle}>Editar Produto</h1>
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
          product={serializableProduct}
          action={updateProductAction}
        />
      </div>
    </div>
  );
}
