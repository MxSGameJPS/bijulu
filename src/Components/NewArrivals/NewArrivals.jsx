import { prisma } from "../../lib/prisma";
import NewArrivalsClient from "./NewArrivalsClient";

export default async function NewArrivals() {
  const launches = await prisma.produto.findMany({
    where: {
      ehLancamento: true,
    },
    take: 10, // Limite de 10 lançamentos para não pesar
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializableLaunches = launches.map((product) => ({
    ...product,
    id: product.id.toString(),
    preco: product.preco.toString(),
    categoriaId: product.categoriaId?.toString(),
    lojaId: product.lojaId?.toString(),
  }));

  return <NewArrivalsClient products={serializableLaunches} />;
}
