"use server";

import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(prevState, formData) {
  const login = formData.get("login");
  const password = formData.get("password");

  if (!login || !password) {
    return { error: "Preencha todos os campos." };
  }

  // Busca usuário no banco
  // IMPORTANTE: Em produção, JAMAIS armazene senhas em texto puro. Use bcrypt/argon2.
  // Como solicitado, estamos verificando diretamente conforme estrutura atual.
  const user = await prisma.usuario.findUnique({
    where: {
      login: login,
    },
  });

  if (!user || user.senha !== password) {
    return { error: "Usuário ou senha inválidos." };
  }

  // Cria sessão simples via cookie
  // Em produção, use JWT ou bibliotecas como NextAuth/Auth.js
  const oneDay = 24 * 60 * 60 * 1000;
  (await cookies()).set("admin_session", user.id.toString(), {
    expires: Date.now() + oneDay,
    httpOnly: true,
    path: "/",
  });

  redirect("/admin/dashboard");
}
