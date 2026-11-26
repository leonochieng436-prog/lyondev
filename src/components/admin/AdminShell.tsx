"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Clock3,
  FileImage,
  FileText,
  FolderKanban,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Newspaper,
  PackagePlus,
  Settings,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";

type AdminNavItem = {
  href: string;
  label: string;
  icon: string;
};

type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

const ICONS = {
  LayoutDashboard,
  MessageSquareText,
  HandCoins,
  CalendarDays,
  FileText,
  PackagePlus,
  FolderKanban,
  BarChart3,
  Star,
  Newspaper,
  FileImage,
  Clock3,
  Settings,
  Users,
  Shield,
} as const;

export default function AdminShell({
  groups,
  role,
  logout,
  children,
}: {
  groups: AdminNavGroup[];
  role: string;
  logout: () => Promise<void>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const pageTitle =
    groups.flatMap((group) => group.items).find((item) => pathname === item.href)?.label ??
    (pathname.split("/").filter(Boolean).pop() || "Dashboard")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

  useEffect(() => {
    if (!drawerOpen) return;

    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        ) ?? [],
      );
    focusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  function renderNavigation(onNavigate?: () => void) {
    return groups.map((group) => (
      <div className="admin-nav-group" key={group.label}>
        <p className="admin-nav-heading">{group.label}</p>
        {group.items.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS] ?? FileText;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`admin-nav-link${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    ));
  }

  function LogoutButton() {
    return (
      <form action={logout}>
        <button className="admin-logout" type="submit">
          <LogOut size={17} aria-hidden="true" />
          <span>Log out</span>
        </button>
      </form>
    );
  }

  return (
    <div className="admin-root">
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <Link href="/admin/dashboard" className="admin-logo" aria-label="LYONDEV admin dashboard">
          <span className="admin-logo-mark">L</span>
          <span>LYON<span className="admin-logo-accent">DEV</span></span>
        </Link>
        <nav className="admin-nav">{renderNavigation()}</nav>
        <div className="admin-sidebar-footer">
          <span className="admin-role-dot" aria-hidden="true" />
          <span>{role}</span>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title">
            <button
              ref={triggerRef}
              className="admin-menu-trigger"
              type="button"
              aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={drawerOpen}
              aria-controls={drawerOpen ? "admin-mobile-drawer" : undefined}
              onClick={() => setDrawerOpen((open) => !open)}
            >
              {drawerOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
            <div>
              <p className="admin-topbar-eyebrow">LYONDEV ADMIN</p>
              <h1>{pageTitle}</h1>
            </div>
          </div>
          <div className="admin-topbar-actions">
            <span className="admin-role-badge">{role}</span>
            <LogoutButton />
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>

      {drawerOpen && (
        <div className="admin-drawer-layer">
          <button
            className="admin-drawer-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            id="admin-mobile-drawer"
            ref={drawerRef}
            className="admin-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation menu"
          >
            <div className="admin-mobile-drawer-header">
              <Link href="/admin/dashboard" className="admin-logo" onClick={() => setDrawerOpen(false)}>
                <span className="admin-logo-mark">L</span>
                <span>LYON<span className="admin-logo-accent">DEV</span></span>
              </Link>
              <button
                type="button"
                className="admin-drawer-close"
                aria-label="Close navigation menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <nav className="admin-nav">{renderNavigation(() => setDrawerOpen(false))}</nav>
            <div className="admin-sidebar-footer">
              <span className="admin-role-dot" aria-hidden="true" />
              <span>{role}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
