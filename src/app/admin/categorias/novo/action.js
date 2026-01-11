"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData) {
  const nomeCategoria = formData.get("nomeCategoria");
  const descricaoCategoria = formData.get("descricaoCategoria");
  const imagemUrl = formData.get("imagemUrl");

  if (!nomeCategoria) {
    return { error: "Nome da Categoria é obrigatório" };
  }

  try {
    await prisma.categoria.create({
      data: {
        nomeCategoria,
        descricaoCategoria: descricaoCategoria || null,
        imagemUrl: imagemUrl || null,
      },
    });
  } catch (error) {
    return { error: "Erro ao criar categoria: " + error.message };
  }

  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}
