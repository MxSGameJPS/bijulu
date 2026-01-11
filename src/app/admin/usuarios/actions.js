"use server";

import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData) {
  const id = formData.get("id");

  try {
    // Evitar que o usuário exclua a si mesmo se estiver logado (idealmente),
    // mas por simplicidade vamos apenas permitir a exclusão.

    await prisma.usuario.delete({
      where: { id: BigInt(id) },
    });
    revalidatePath("/admin/usuarios");
    return { success: true };
  } catch (error) {
    return { error: "Erro ao excluir usuário." };
  }
}
