"use client";
import { useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/admin/AuthShell";
import { AuthInput, AuthSubmitButton } from "@/components/admin/AuthControls";
import { requestReset } from "./actions";

export default function Forgot() {
  const [st, action] = useActionState(requestReset, {} as { sent?: boolean });

  return (
    <AuthShell title="Reset password">
      <form action={action} className="admin-auth-form">
        {st.sent ? (
          <div className="admin-auth-success" role="status" aria-live="polite">
            <p>If that account exists, a reset link has been sent.</p>
            <Link href="/admin/login">Return to sign in</Link>
          </div>
        ) : (
          <>
            <p className="admin-auth-description">
              Enter the email address associated with your admin account.
            </p>
            <AuthInput
              name="email"
              label="Email address"
              placeholder="you@company.com"
              autoComplete="username"
            />
            <AuthSubmitButton icon="mail" pendingLabel="Sending…">
              Send reset link
            </AuthSubmitButton>
          </>
        )}
      </form>
    </AuthShell>
  );
}
