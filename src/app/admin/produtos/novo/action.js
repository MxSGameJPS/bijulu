"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData) {
  const nome = formData.get("nome");
  const preco = formData.get("preco");
  const imagemUrl = formData.get("imagemUrl");
  const categoriaId = formData.get("categoriaId");
  const lojaId = formData.get("lojaId");
  const quantidadeEstoque = formData.get("quantidadeEstoque");
  const ehLancamento = formData.get("ehLancamento") === "on";

  // Validação básica
  if (!nome || !preco) {
    return { error: "Nome e Preço são obrigatórios" };
  }

  try {
    await prisma.produto.create({
      data: {
        nome,
        preco: parseFloat(preco.replace(",", ".")), // Aceita vírgula
        imagemUrl: imagemUrl || null,
        quantidadeEstoque: parseInt(quantidadeEstoque) || 0,
        ehLancamento,
        categoriaId: categoriaId ? BigInt(categoriaId) : null,
        lojaId: lojaId ? BigInt(lojaId) : null,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Erro ao criar produto: " + error.message };
  }

  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}
