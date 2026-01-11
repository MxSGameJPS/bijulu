"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { User, Lock } from "lucide-react";
import Image from "next/image";
import styles from "./login.module.css";
import { loginAction } from "./action";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.button} disabled={pending}>
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Bijulu Admin"
            width={200}
            height={70}
            style={{ objectFit: "contain" }}
          />
        </div>

        <p className={styles.subtitle}>
          Acesso Restrito ao Painel Administrativo
        </p>

        {state?.error && (
          <div className={styles.errorMessage}>{state.error}</div>
        )}

        <form action={formAction} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="login" className={styles.label}>
              Usuário
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={20} />
              <input
                type="text"
                id="login"
                name="login"
                className={styles.input}
                placeholder="Digite seu usuário"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={20} />
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                placeholder="********"
                required
              />
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
