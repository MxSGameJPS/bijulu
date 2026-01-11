"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateStoreAction(formData) {
  const id = formData.get("id");
  const nome = formData.get("nome");
  const endereco = formData.get("endereco");
  const cidade = formData.get("cidade");

  if (!id || !nome) {
    return { error: "Dados inválidos" };
  }

  try {
    await prisma.loja.update({
      where: { id: BigInt(id) },
      data: {
        nome,
        endereco: endereco || null,
        cidade: cidade || null,
      },
    });
  } catch (error) {
    return { error: "Erro ao atualizar loja: " + error.message };
  }

  revalidatePath("/admin/lojas");
  redirect("/admin/lojas");
}
