"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCategory(formData) {
  const id = formData.get("id");

  try {
    // Verificar se existem produtos nesta categoria antes de excluir seria ideal,
    // mas por simplicidade vamos permitir, mas o banco pode reclamar se houver relação restrita.
    // O Prisma schema não define onDelete: Cascade explicitamente, então pode dar erro se tiver produto.

    await prisma.categoria.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/categorias");
    return { success: true };
  } catch (error) {
    return {
      error:
        "Erro ao excluir categoria. Verifique se não há produtos vinculados.",
    };
  }
}
