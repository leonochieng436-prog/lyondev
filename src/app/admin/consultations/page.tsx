import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import { setConsultation } from "./actions";
import { Button, DataTable, StatusPill } from "@/components/admin/AdminUI";

export default async function Consultations() {
  await requirePerm("leads");
  const rows = await db.consultation.findMany({ orderBy: { startsAt: "desc" }, take: 100 });
  return (
    <main>
      <div className="admin-page-header">
        <div>
          <h2>Consultations</h2>
          <p>Review upcoming and completed consultation bookings.</p>
        </div>
      </div>
      <section className="admin-card">
        {rows.length === 0 ? (
          <div className="admin-empty-state">
            <span className="admin-empty-mark" aria-hidden="true" />
            <h3>No bookings yet</h3>
            <p>Consultation requests will appear here when a visitor books a time.</p>
          </div>
        ) : (
          <DataTable>
              <thead>
                <tr>
                  <th>Appointment</th>
                  <th>Contact</th>
                  <th>Details</th>
                  <th>Status &amp; notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((consultation) => (
                  <tr key={consultation.id}>
                    <td>
                      <strong>{consultation.startsAt.toLocaleString("en-KE", { timeZone: "Africa/Nairobi", dateStyle: "medium", timeStyle: "short" })}</strong>
                      <span className="admin-table-secondary">{consultation.type}</span>
                    </td>
                    <td>
                      <strong>{consultation.name}</strong>
                      <a className="admin-table-secondary" href={`mailto:${consultation.email}`}>{consultation.email}</a>
                      <span className="admin-table-secondary">{consultation.phone}</span>
                    </td>
                    <td className="admin-inquiry-message"><p>{consultation.details}</p></td>
                    <td>
                      <div className="admin-consultation-status"><StatusPill status={consultation.status} /></div>
                      <form action={setConsultation} className="admin-consultation-form">
                        <input type="hidden" name="id" value={consultation.id} />
                        <select
                          name="status"
                          defaultValue={consultation.status}
                          aria-label={`Status for ${consultation.name}`}
                          data-status={consultation.status}
                        >
                          {["PENDING", "CONFIRMED", "RESCHEDULED", "COMPLETED", "CANCELLED"].map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                        <input
                          name="notes"
                          defaultValue={consultation.notes ?? ""}
                          placeholder="Internal notes"
                          aria-label={`Internal notes for ${consultation.name}`}
                        />
                        <Button type="submit">Save</Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
          </DataTable>
        )}
      </section>
    </main>
  );
}
