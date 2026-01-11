"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteStore(formData) {
  const id = formData.get("id");

  try {
    await prisma.loja.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/lojas");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir loja." };
  }
}
