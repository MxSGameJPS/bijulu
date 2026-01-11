"use server";

import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createUserAction(formData) {
  const login = formData.get("login");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (!login || !password) {
    return { error: "Login e Senha são obrigatórios" };
  }

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem" };
  }

  // Verifica se usuário já existe
  const existingUser = await prisma.usuario.findUnique({
    where: { login },
  });

  if (existingUser) {
    return { error: "Usuário já existe" };
  }

  try {
    await prisma.usuario.create({
      data: {
        login,
        senha: password, // NOTA: Em produção, usar hash! Mantendo padrão atual do projeto.
      },
    });
  } catch (error) {
    return { error: "Erro ao criar usuário: " + error.message };
  }

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}
