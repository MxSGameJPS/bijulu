import { prisma } from "../../../lib/prisma";
import styles from "./ProductPage.module.css";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductActions from "./ProductActions";

export default async function ProductPage(props) {
  const params = await props.params;
  const { id } = params;

  // 1. Fetch Produto
  const product = await prisma.produto.findUnique({
    where: { id: BigInt(id) },
    include: {
      categoria: true,
      loja: true, // Se quiser mostrar onde está disponível
    },
  });

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  // 2. Fetch Produtos Relacionados (mesma categoria, exceto o atual)
  const relatedProducts = await prisma.produto.findMany({
    where: {
      categoriaId: product.categoriaId,
      id: { not: product.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  const price = Number(product.preco);
  const installmentCount = 3;
  const installmentValue = (price / installmentCount).toFixed(2);

  // Serializar dados para o ProductCard nos relacionados
  const serializableRelated = relatedProducts.map((p) => ({
    ...p,
    id: p.id.toString(),
    preco: p.preco.toString(),
    categoriaId: p.categoriaId?.toString(),
    lojaId: p.lojaId?.toString(),
  }));

  const whatsappMessage = `Olá! Gostei do produto *${product.nome}* que vi no site. Gostaria de saber mais!`;
  const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(
    whatsappMessage
  )}`; // Substituir pelo número real

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={18} /> Voltar para Home
      </Link>

      <div className={styles.productWrapper}>
        {/* Imagem */}
        <div className={styles.imageContainer}>
          {product.imagemUrl ? (
            <Image
              src={product.imagemUrl}
              alt={product.nome}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f9f9f9",
                color: "#ccc",
              }}
            >
              Sem Imagem
            </div>
          )}
        </div>

        {/* Informações */}
        <div className={styles.infoContainer}>
          <div className={styles.category}>
            {product.categoria?.nomeCategoria}
          </div>
          <h1 className={styles.title}>{product.nome}</h1>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(price)}
            </div>
            <div className={styles.installments}>
              em até {installmentCount}x de R${" "}
              {installmentValue.replace(".", ",")} sem juros
            </div>
          </div>

          <ProductActions
            product={{
              id: product.id.toString(),
              nome: product.nome,
              preco: product.preco.toString(),
              imagemUrl: product.imagemUrl,
              // Evitar passar objetos complexos ou BigInts ocultos (como em relations)
            }}
            whatsappLink={whatsappLink}
          />

          {/* Detalhes / Descrição */}
          <div className={styles.detailsSection}>
            <h3 className={styles.sectionTitle}>Detalhes do Produto</h3>
            <p className={styles.description}>
              {product.descricao ||
                "Produto de alta qualidade, selecionado especialmente para você. Design exclusivo Bijulu."}
              {/* Nota: Precisa ver se existe campo descrição no banco, se não, usar texto genérico ou adicionar campo */}
            </p>
          </div>

          {/* Disponibilidade */}
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: product.quantidadeEstoque > 0 ? "green" : "red",
            }}
          >
            {product.quantidadeEstoque > 0
              ? `Disponível na loja: ${product.loja?.nome || "Matriz"}`
              : "Produto Esgotado"}
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2
            className={styles.sectionTitle}
            style={{
              fontSize: "1.5rem",
              textTransform: "uppercase",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
            }}
          >
            Você também pode gostar
          </h2>
          <div className={styles.relatedGrid}>
            {serializableRelated.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
