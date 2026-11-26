import { getSession, can } from "@/lib/auth";
import { logout } from "./login/actions";
import AdminShell from "@/components/admin/AdminShell";
import "./admin.css";

const NAV_GROUPS = [
  { label: "Overview", items: [["dashboard", "Dashboard", "", "LayoutDashboard"]] },
  {
    label: "Leads",
    items: [
      ["inquiries", "Inquiries", "leads", "MessageSquareText"],
      ["quotes", "Quotes", "leads", "HandCoins"],
      ["consultations", "Consultations", "leads", "CalendarDays"],
    ],
  },
  {
    label: "Content",
    items: [
      ["services", "Services", "content", "FileText"],
      ["pricing", "Pricing", "content", "HandCoins"],
      ["addons", "Add-ons", "content", "PackagePlus"],
      ["portfolio", "Portfolio", "content", "FolderKanban"],
      ["industries", "Solutions", "content", "BarChart3"],
      ["testimonials", "Testimonials", "content", "Star"],
      ["insights", "Insights", "content", "Newspaper"],
      ["media", "Media", "content", "FileImage"],
    ],
  },
  {
    label: "System",
    items: [
      ["availability", "Hours", "*", "Clock3"],
      ["settings", "Settings", "*", "Settings"],
      ["users", "Users", "*", "Users"],
      ["privacy-requests", "Privacy requests", "*", "Shield"],
    ],
  },
] as const;

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const s = await getSession();
  if (!s) return <>{children}</>;

  const groups = NAV_GROUPS.map((group) => ({
    label: group.label,
    items: group.items
      .filter(([, , permission]) => !permission || can(s.role, permission))
      .map(([href, label, , icon]) => ({ href: `/admin/${href}`, label, icon })),
  })).filter((group) => group.items.length > 0);

  return <AdminShell groups={groups} role={s.role} logout={logout}>{children}</AdminShell>;
}
