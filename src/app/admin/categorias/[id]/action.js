"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateCategoryAction(formData) {
  const id = formData.get("id");
  const nomeCategoria = formData.get("nomeCategoria");
  const descricaoCategoria = formData.get("descricaoCategoria");
  const imagemUrl = formData.get("imagemUrl");

  if (!id || !nomeCategoria) {
    return { error: "Dados inválidos" };
  }

  try {
    await prisma.categoria.update({
      where: { id: BigInt(id) },
      data: {
        nomeCategoria,
        descricaoCategoria: descricaoCategoria || null,
        imagemUrl: imagemUrl || null,
      },
    });
  } catch (error) {
    return { error: "Erro ao atualizar categoria: " + error.message };
  }

  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}
