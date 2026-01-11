"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateProductAction(formData) {
  const id = formData.get("id");
  const nome = formData.get("nome");
  const preco = formData.get("preco");
  const categoriaId = formData.get("categoriaId");
  const lojaId = formData.get("lojaId");
  const imagemUrl = formData.get("imagemUrl");
  const quantidadeEstoque = formData.get("quantidadeEstoque");
  const ehLancamento = formData.get("ehLancamento") === "on";

  if (!id || !nome || !preco) {
    return { error: "Dados inválidos" };
  }

  try {
    const dataToUpdate = {
      nome,
      preco: parseFloat(preco.replace(",", ".")), // Converte R$
      categoriaId: categoriaId ? BigInt(categoriaId) : null,
      lojaId: lojaId ? BigInt(lojaId) : null,
      imagemUrl: imagemUrl || null,
      quantidadeEstoque: parseInt(quantidadeEstoque) || 0,
      ehLancamento,
    };

    await prisma.produto.update({
      where: { id: BigInt(id) },
      data: dataToUpdate,
    });
  } catch (error) {
    console.error(error);
    return { error: "Erro ao atualizar produto: " + error.message };
  }

  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}
