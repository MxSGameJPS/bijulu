"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createStoreAction(formData) {
  const nome = formData.get("nome");
  const endereco = formData.get("endereco");
  const cidade = formData.get("cidade");

  if (!nome) {
    return { error: "Nome da Loja é obrigatório" };
  }

  try {
    await prisma.loja.create({
      data: {
        nome,
        endereco: endereco || null,
        cidade: cidade || null,
      },
    });
  } catch (error) {
    return { error: "Erro ao criar loja: " + error.message };
  }

  revalidatePath("/admin/lojas");
  redirect("/admin/lojas");
}
