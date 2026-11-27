"use client";

import { useActionState } from "react";
import { saveImageSetting, type ImageSettingState } from "./actions";

const initialState: ImageSettingState = {};

export default function ImageSettingForm({
  settingKey,
  title,
  description,
  currentUrl,
}: {
  settingKey: string;
  title: string;
  description: string;
  currentUrl: string;
}) {
  const [state, action, pending] = useActionState(saveImageSetting, initialState);
  const previewUrl = state.url ?? currentUrl;

  return (
    <article className="admin-image-setting">
      <header>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      {previewUrl ? (
        <img
          className="admin-image-setting-preview"
          src={previewUrl}
          alt={`Current ${title.toLowerCase()} image`}
        />
      ) : (
        <p className="admin-image-setting-empty">
          No custom image uploaded. The website will use its existing fallback.
        </p>
      )}
      <form action={action} className="admin-image-setting-form">
        <input type="hidden" name="key" value={settingKey} />
        <label htmlFor={`${settingKey}-file`}>Choose an image (JPG, PNG or WebP; maximum 5 MB)</label>
        <input
          id={`${settingKey}-file`}
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          required
        />
        <button type="submit" className="admin-button is-primary" disabled={pending}>
          {pending ? "Uploading…" : "Upload image"}
        </button>
      </form>
      {state.error && <p className="admin-upload-message is-error" role="alert">{state.error}</p>}
      {state.message && <p className="admin-upload-message" role="status">{state.message}</p>}
    </article>
  );
}
