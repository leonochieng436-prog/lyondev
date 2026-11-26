"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, KeyRound, LogIn, Mail } from "lucide-react";

export function AuthInput({
  name,
  label,
  placeholder,
  autoComplete,
  invalid = false,
  type = "email",
  minLength,
}: {
  name: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  invalid?: boolean;
  type?: "email" | "password";
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const InputIcon = isPassword ? KeyRound : Mail;

  return (
    <div className="admin-auth-field">
      <label htmlFor={`admin-auth-${name}`}>{label}</label>
      <div className="admin-auth-input-wrap">
        <span className="admin-auth-input-accent" aria-hidden="true" />
        <InputIcon className="admin-auth-field-icon" size={18} aria-hidden="true" />
        <input
          id={`admin-auth-${name}`}
          name={name}
          type={isPassword && visible ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          minLength={minLength}
          aria-invalid={invalid || undefined}
        />
        {isPassword && (
          <button
            className="admin-auth-visibility"
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthSubmitButton({
  children,
  pendingLabel,
  icon,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  icon: "login" | "mail" | "key";
}) {
  const { pending } = useFormStatus();
  const Icon = icon === "login" ? LogIn : icon === "mail" ? Mail : KeyRound;

  return (
    <button className="admin-auth-submit" type="submit" disabled={pending}>
      <Icon size={18} aria-hidden="true" />
      {pending ? pendingLabel : children}
    </button>
  );
}
