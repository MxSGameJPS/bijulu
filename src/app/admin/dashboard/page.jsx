import { prisma } from "../../../lib/prisma";
import styles from "../../../styles/AdminDashboard.module.css";

export default async function DashboardPage() {
  // 1. Fetch Counts
  const productCount = await prisma.produto.count();
  const categoryCount = await prisma.categoria.count();
  const storeCount = await prisma.loja.count();

  // 2. Fetch Low Stock Products (< 3)
  const lowStockProducts = await prisma.produto.findMany({
    where: {
      quantidadeEstoque: {
        lt: 3,
      },
    },
    take: 5, // Mostrar apenas os 5 primeiros
    orderBy: {
      quantidadeEstoque: "asc",
    },
  });

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <div>Olá, Administrador</div>
      </div>

      {/* Cards de Métricas */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.cardBlue}`}>
          <span className={styles.cardTitle}>Total de Produtos</span>
          <span className={styles.cardValue}>{productCount}</span>
        </div>

        <div className={`${styles.statCard} ${styles.cardYellow}`}>
          <span className={styles.cardTitle}>Categorias</span>
          <span className={styles.cardValue}>{categoryCount}</span>
        </div>

        <div className={`${styles.statCard} ${styles.cardPink}`}>
          <span className={styles.cardTitle}>Lojas Físicas</span>
          <span className={styles.cardValue}>{storeCount}</span>
        </div>

        <div className={`${styles.statCard} ${styles.cardPurple}`}>
          <span className={styles.cardTitle}>Estoque Crítico</span>
          <span className={styles.cardValue}>{lowStockProducts.length}</span>
        </div>
      </div>

      {/* Tabela de Estoque Baixo */}
      <h2 className={styles.sectionTitle}>
        Produtos com Baixo Estoque (Menos de 3)
      </h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((produ) => (
              <tr key={produ.id.toString()}>
                <td>{produ.nome}</td>
                <td>R$ {Number(produ.preco).toFixed(2)}</td>
                <td>{produ.quantidadeEstoque} un</td>
                <td>
                  <span className={styles.lowStockBadge}>Crítico</span>
                </td>
              </tr>
            ))}
            {lowStockProducts.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#999" }}>
                  Nenhum produto com estoque baixo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
