import { prisma } from "../../lib/prisma";
import CategoryShowcaseClient from "./CategoryShowcaseClient";

export default async function CategoryShowcase() {
  const categories = await prisma.categoria.findMany({
    orderBy: {
      nomeCategoria: "asc",
    },
  });

  const serializableCategories = categories.map((c) => ({
    ...c,
    id: c.id.toString(),
  }));

  return <CategoryShowcaseClient categories={serializableCategories} />;
}
