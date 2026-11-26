import Link from "next/link";

export default function AuthShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="admin-auth-page">
      <div className="admin-auth-layout">
        <section className="admin-auth-form-card" aria-labelledby="admin-auth-title">
          <Link className="admin-auth-logo" href="/" aria-label="LYONDEV home">
            LYON<span>DEV</span>
          </Link>
          <h1 className="admin-auth-title" id="admin-auth-title">{title}</h1>
          <div className="admin-auth-underline" aria-hidden="true" />
          {children}
        </section>

        <aside className="admin-auth-welcome">
          <svg
            className="admin-auth-waves"
            viewBox="0 0 460 420"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M0 245C91 202 128 306 224 279c93-26 128-158 236-124v265H0V245Z"
              fill="var(--auth-wave-light)"
            />
            <path
              d="M0 290c98-56 146 59 239 22 86-35 127-124 221-98v206H0V290Z"
              fill="var(--auth-wave-dark)"
            />
            <path
              d="M0 337c88-57 157 6 246-20 87-25 127-95 214-80v183H0v-83Z"
              fill="var(--auth-wave-cyan)"
            />
          </svg>
          <div className="admin-auth-welcome-content">
            <p className="admin-auth-eyebrow">LYONDEV ADMIN</p>
            <h2>Welcome back</h2>
            <p>Sign in to manage your website, leads and content.</p>
            <Link className="admin-auth-back-link" href="/">Back to website</Link>
          </div>
          <span className="admin-auth-welcome-orb" aria-hidden="true" />
        </aside>
      </div>
    </main>
  );
}
