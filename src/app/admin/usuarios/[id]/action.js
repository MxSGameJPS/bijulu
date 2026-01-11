"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateUserAction(formData) {
  const id = formData.get("id");
  const login = formData.get("login");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!login || !id) {
    return { error: "Dados inválidos" };
  }

  // Se o usuário preencheu senha, validar
  let dataToUpdate = { login };

  if (password) {
    if (password !== confirmPassword) {
      return { error: "As senhas não coincidem" };
    }
    dataToUpdate.senha = password;
  }

  try {
    await prisma.usuario.update({
      where: { id: BigInt(id) },
      data: dataToUpdate,
    });
  } catch (error) {
    return { error: "Erro ao atualizar usuário: " + error.message };
  }

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}
