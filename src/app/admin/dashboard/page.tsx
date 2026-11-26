import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileCheck2,
  FileClock,
  FilePlus2,
  MessageSquareText,
  PackageCheck,
  Star,
} from "lucide-react";
import {
  ActionLink,
  Card,
  DataTable,
  EmptyState,
  PageHeader,
  StatusPill,
} from "@/components/admin/AdminUI";

export default async function Dashboard() {
  await requirePerm();
  const [total, published, drafts, inquiries, pending, services, testimonials, recent] = await Promise.all([
    db.portfolioProject.count(), db.portfolioProject.count({ where: { status: "PUBLISHED" } }), db.portfolioProject.count({ where: { status: "DRAFT" } }),
    db.inquiry.count(), db.inquiry.count({ where: { status: "NEW" } }), db.service.count({ where: { status: "PUBLISHED" } }),
    db.testimonial.count({ where: { status: "PUBLISHED" } }), db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
  ]);
  const cards = [
    ["Projects", total, BriefcaseBusiness],
    ["Published", published, FileCheck2],
    ["Drafts", drafts, FileClock],
    ["Inquiries", inquiries, MessageSquareText],
    ["New inquiries", pending, FilePlus2],
    ["Active services", services, PackageCheck],
    ["Testimonials", testimonials, Star],
  ] as const;

  return (
    <main>
      <PageHeader
        title="Overview"
        description="A quick snapshot of your website, content and incoming leads."
      />
      <div className="admin-dashboard-stats">
        {cards.map(([label, value, Icon]) => (
          <div className="admin-stat-card" key={label}>
            <div className="admin-stat-top">
              <span>{label}</span>
              <span className="admin-stat-icon"><Icon size={18} aria-hidden="true" /></span>
            </div>
            <span className="admin-stat-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="admin-quick-actions" aria-label="Quick actions">
        <ActionLink href="/admin/inquiries">
          <MessageSquareText size={16} aria-hidden="true" /> Manage inquiries
        </ActionLink>
        <ActionLink href="/admin/services?new=1" variant="secondary">
          <FilePlus2 size={16} aria-hidden="true" /> Add a service
        </ActionLink>
        <ActionLink href="/admin/quotes?new=1" variant="secondary">
          <ArrowUpRight size={16} aria-hidden="true" /> Create a quote
        </ActionLink>
      </div>

      <Card title="Recent inquiries">
        {recent.length === 0 ? (
          <EmptyState title="No inquiries yet">
            New requests from the contact form will appear here.
          </EmptyState>
        ) : (
          <DataTable>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td><span className="font-semibold">{inquiry.reference}</span></td>
                    <td>{inquiry.name}</td>
                    <td>{inquiry.service}</td>
                    <td>{inquiry.createdAt.toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi" })}</td>
                    <td><StatusPill status={inquiry.status} /></td>
                  </tr>
                ))}
              </tbody>
          </DataTable>
        )}
      </Card>
    </main>
  );
}
