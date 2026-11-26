"use client";
import { useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/admin/AuthShell";
import { AuthInput, AuthSubmitButton } from "@/components/admin/AuthControls";
import { login } from "./actions";

export default function Login() {
  const [st, action] = useActionState(login, {} as { error?: string });

  return (
    <AuthShell title="Admin sign in">
      <form action={action} className="admin-auth-form">
        <AuthInput
          name="email"
          label="Email address"
          placeholder="you@company.com"
          autoComplete="username"
          invalid={Boolean(st.error)}
        />
        <AuthInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          invalid={Boolean(st.error)}
        />
        <div className="admin-auth-form-row">
          <span aria-hidden="true" />
          <Link href="/admin/forgot">Forgot password?</Link>
        </div>
        {st.error && (
          <p className="admin-auth-alert" role="alert" aria-live="polite">
            {st.error}
          </p>
        )}
        <AuthSubmitButton icon="login" pendingLabel="Signing in…">
          Log in
        </AuthSubmitButton>
      </form>
    </AuthShell>
  );
}
