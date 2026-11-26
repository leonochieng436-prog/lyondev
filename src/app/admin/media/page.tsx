import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import Uploader from "./Uploader";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export default async function Media() {
  await requirePerm("content");
  const rows = await db.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 60 });
  const assets = rows.map((asset) => ({
    id: asset.id,
    url: asset.url,
    mimeType: asset.mimeType,
    sizeBytes: asset.sizeBytes,
    createdAt: asset.createdAt.toLocaleDateString("en-KE", { timeZone: "Africa/Nairobi" }),
  }));

  return (
    <main>
      <PageHeader title="Media library" description="Upload and manage images used throughout the website." />
      <Uploader assets={assets} />
      {rows.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="Your media library is empty">
            Uploaded images will be available here to use across the website.
          </EmptyState>
        </div>
      ) : null}
    </main>
  );
}
