"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData) {
  const id = formData.get("id");

  try {
    await prisma.produto.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/produtos");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir produto" };
  }
}
