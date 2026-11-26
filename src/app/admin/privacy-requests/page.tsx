import { requirePerm } from "@/lib/auth";
import { db } from "@/lib/db";
import { setPrivacyRequestStatus } from "./actions";

const STATUSES = ["NEW", "IN_REVIEW", "COMPLETED", "CLOSED"];

export default async function PrivacyRequestsPage() {
  await requirePerm("*");
  const requests = await db.privacyRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main>
      <h1 className="text-2xl font-bold text-navy">Privacy requests</h1>
      <p className="mt-2 text-sm text-muted">Restricted to administrators. Handle request details confidentially.</p>
      {requests.length === 0 && <p className="mt-6 text-muted">No privacy requests yet.</p>}
      <ul className="mt-6 divide-y rounded-xl border">
        {requests.map((request) => (
          <li key={request.id} className="flex flex-wrap items-start justify-between gap-4 p-4 text-sm">
            <div className="min-w-0">
              <p className="font-semibold">{request.requestType} · {request.name}</p>
              <a href={`mailto:${request.email}`} className="text-blue-700 underline">{request.email}</a>
              <p className="mt-1 whitespace-pre-wrap break-words">{request.details}</p>
              <p className="mt-2 text-xs text-muted">Received {request.createdAt.toLocaleString()}</p>
            </div>
            <form action={setPrivacyRequestStatus} className="flex gap-2">
              <input type="hidden" name="id" value={request.id} />
              <select name="status" defaultValue={request.status} className="rounded border p-1">
                {STATUSES.map((status) => <option key={status}>{status}</option>)}
              </select>
              <button className="rounded bg-navy px-3 py-1 text-white">Save</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
