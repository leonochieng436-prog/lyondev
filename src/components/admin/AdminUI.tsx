import { cloneElement, type ComponentProps, type ReactElement, type ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  loading?: boolean;
}) {
  return (
    <button
      {...props}
      className={`admin-button is-${variant} ${className}`}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: Exclude<ButtonVariant, "danger">;
}) {
  return <Link className={`admin-button is-${variant}`} href={href}>{children}</Link>;
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={`admin-control ${props.className ?? ""}`} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={`admin-control ${props.className ?? ""}`} />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={`admin-control ${props.className ?? ""}`} />;
}

export function Checkbox(props: ComponentProps<"input">) {
  return <input {...props} type="checkbox" className={`admin-checkbox ${props.className ?? ""}`} />;
}

export function FormField({
  id,
  label,
  hint,
  error,
  required = false,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactElement<{
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
  }>;
}) {
  const describedBy = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="admin-form-field">
      <label htmlFor={id}>
        {label}{required && <span className="admin-required" aria-hidden="true"> *</span>}
      </label>
      {cloneElement(children, {
        id,
        "aria-describedby": describedBy || undefined,
        "aria-invalid": error ? true : undefined,
      })}
      {hint && <p id={`${id}-hint`} className="admin-field-hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="admin-field-error" role="alert">{error}</p>}
    </div>
  );
}

export function Alert({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "success" | "warning" | "error";
}) {
  return <div className={`admin-alert tone-${tone}`} role={tone === "error" ? "alert" : "status"}>{children}</div>;
}

export function DataTable({ children }: { children: ReactNode }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">{children}</table>
    </div>
  );
}

export function ConfirmDelete({
  action,
  resource,
  id,
}: {
  action: (formData: FormData) => Promise<void>;
  resource: string;
  id: string;
}) {
  return (
    <details className="admin-delete-confirm">
      <summary>Delete</summary>
      <div className="admin-delete-prompt">
        <p>Delete this record? This action cannot be undone.</p>
        <form action={action}>
          <input type="hidden" name="_res" value={resource} />
          <input type="hidden" name="_id" value={id} />
          <button type="submit">Confirm delete</button>
        </form>
      </div>
    </details>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand";
}) {
  return <span className={`admin-badge is-${tone}`}>{children}</span>;
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-page-header">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="admin-page-header-action">{action}</div>}
    </div>
  );
}

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`admin-card ${className}`}>
      {title && <h3 className="admin-card-title">{title}</h3>}
      {children}
    </section>
  );
}

export function StatusPill({ status }: { status: string }) {
  const key = status.toUpperCase();
  const tone =
    ["NEW"].includes(key)
      ? "blue"
      : ["CONTACTED", "IN_DISCUSSION", "PENDING", "RESCHEDULED"].includes(key)
        ? "amber"
        : ["QUOTED", "SENT"].includes(key)
          ? "purple"
          : ["CONVERTED", "PUBLISHED", "CONFIRMED", "COMPLETED", "ACTIVE", "ACCEPTED"].includes(key)
            ? "green"
            : ["CLOSED", "CANCELLED", "DRAFT", "EXPIRED"].includes(key)
              ? "gray"
              : ["SUSPENDED", "REJECTED"].includes(key)
                ? "red"
                : "gray";

  return <span className={`admin-status-pill tone-${tone}`}>{status.replaceAll("_", " ")}</span>;
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-mark" aria-hidden="true" />
      <h3>{title}</h3>
      {children && <p>{children}</p>}
    </div>
  );
}
