"use client";
import { use, useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/admin/AuthShell";
import { AuthInput, AuthSubmitButton } from "@/components/admin/AuthControls";
import { resetPassword } from "../../forgot/actions";

export default function Reset({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [st, action] = useActionState(resetPassword, {} as { error?: string; done?: boolean });

  return (
    <AuthShell title="Choose a new password">
      <form action={action} className="admin-auth-form">
        {st.done ? (
          <div className="admin-auth-success" role="status" aria-live="polite">
            <p>Password updated.</p>
            <Link href="/admin/login">Sign in</Link>
          </div>
        ) : (
          <>
            <input type="hidden" name="token" value={token} />
            <p className="admin-auth-description">
              Choose a new password with at least 10 characters.
            </p>
            <AuthInput
              name="password"
              type="password"
              label="New password"
              placeholder="At least 10 characters"
              autoComplete="new-password"
              minLength={10}
              invalid={Boolean(st.error)}
            />
            {st.error && (
              <p className="admin-auth-alert" role="alert" aria-live="polite">
                {st.error}
              </p>
            )}
            <AuthSubmitButton icon="key" pendingLabel="Updating…">
              Update password
            </AuthSubmitButton>
          </>
        )}
      </form>
    </AuthShell>
  );
}
