"use client";
import { useActionState, useState } from "react";
import { Check, Copy } from "lucide-react";
import { upload } from "./actions";

type MediaAssetSummary = {
  id: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Uploader({ assets }: { assets: MediaAssetSummary[] }) {
  const [st, action, pending] = useActionState(upload, {} as { msg?: string; url?: string });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState("");

  async function copyUrl(asset: MediaAssetSummary) {
    setCopyError("");
    if (!navigator.clipboard) {
      setCopyError("Clipboard access is unavailable in this browser.");
      return;
    }

    try {
      await navigator.clipboard.writeText(asset.url);
      setCopiedId(asset.id);
    } catch {
      setCopyError("Could not copy the image URL. Select and copy it from the field instead.");
    }
  }

  return (
    <>
      <form action={action} className="admin-upload-form">
        <div className="admin-upload-dropzone">
          <div>
            <strong>Upload an image</strong>
            <span>JPG, PNG or WebP · maximum 5 MB</span>
          </div>
          <input type="file" name="file" accept="image/jpeg,image/png,image/webp" required />
          <button disabled={pending} className="admin-primary-button" type="submit">
            {pending ? "Uploading…" : "Upload"}
          </button>
        </div>
        {st.msg && <p className="admin-upload-message" role="status">{st.msg}</p>}
      </form>
      {copyError && <p className="admin-upload-message is-error" role="alert">{copyError}</p>}
      {assets.length > 0 && (
        <ul className="admin-media-grid">
          {assets.map((asset) => (
            <li key={asset.id} className="admin-media-card">
              <img src={asset.url} alt="" loading="lazy" />
              <div className="admin-media-details">
                <span>{asset.mimeType} · {formatBytes(asset.sizeBytes)} · {asset.createdAt}</span>
                <input readOnly value={asset.url} aria-label={`URL for ${asset.mimeType} image`} />
                <button
                  type="button"
                  className="admin-copy-url"
                  onClick={() => void copyUrl(asset)}
                  aria-label={copiedId === asset.id ? "Image URL copied" : "Copy image URL"}
                >
                  {copiedId === asset.id ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  {copiedId === asset.id ? "Copied" : "Copy URL"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
