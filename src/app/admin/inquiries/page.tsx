import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import { setStatus } from "./actions";
import { Button, Card, DataTable, EmptyState, PageHeader, StatusPill } from "@/components/admin/AdminUI";
const ST = ["NEW", "CONTACTED", "IN_DISCUSSION", "QUOTED", "CONVERTED", "CLOSED"];

export default async function Inquiries() {
  await requirePerm("leads");
  const rows = await db.inquiry.findMany({ where: { archived: false }, orderBy: { createdAt: "desc" }, take: 50 });
  return (
    <main>
      <PageHeader title="Inquiries" description={`${rows.length} recent enquiries that need follow-up.`} />
      <Card>
        {rows.length === 0 ? (
          <EmptyState title="No inquiries yet">
            Enquiries sent through the public contact form will be listed here.
          </EmptyState>
        ) : (
          <DataTable>
              <thead>
                <tr>
                  <th>Reference / message</th>
                  <th>Contact</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th className="admin-table-action">Update</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="admin-inquiry-message">
                      <strong>{inquiry.reference} · {inquiry.name}</strong>
                      <span>{inquiry.service}</span>
                      <p>{inquiry.message}</p>
                    </td>
                    <td>
                      <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                      <span className="admin-table-secondary">{inquiry.phone}</span>
                    </td>
                    <td>{inquiry.createdAt.toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi" })}</td>
                    <td><StatusPill status={inquiry.status} /></td>
                    <td className="admin-table-action">
                      <form action={setStatus} className="admin-inline-form">
                        <input type="hidden" name="id" value={inquiry.id} />
                        <select
                          name="status"
                          aria-label={`Status for ${inquiry.reference}`}
                          defaultValue={inquiry.status}
                          className="admin-status-select"
                          data-status={inquiry.status}
                        >
                          {ST.map((status) => <option key={status}>{status}</option>)}
                        </select>
                        <Button type="submit">Save</Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
          </DataTable>
        )}
      </Card>
    </main>
  );
}
