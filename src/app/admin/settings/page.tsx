import { db } from "@/lib/db";
import { requirePerm } from "@/lib/auth";
import { HOME_IMAGE_SETTINGS } from "@/lib/settings";
import { saveSettings } from "./actions";
import ImageSettingForm from "./ImageSettingForm";
import { Button, PageHeader, Textarea } from "@/components/admin/AdminUI";
const KEYS = [["companyName", "Company name"], ["tagline", "Tagline"], ["aboutSummary", "About summary"], ["vision", "Vision"], ["mission", "Mission"], ["values", "Core values"], ["email", "Business email"], ["phone", "Phone"], ["whatsapp", "WhatsApp number (e.g. 2547XXXXXXXX)"], ["address", "Address"], ["addressPubliclyVerified", "Publish address only after verifying it (enter true to publish)"], ["hours", "Business hours"], ["facebook", "Facebook URL"], ["twitter", "X (Twitter) URL"], ["linkedin", "LinkedIn URL"], ["gaId", "Google Analytics ID (G-XXXX)"], ["faq", "FAQ (JSON: [{\"q\":\"…\",\"a\":\"…\",\"category\":\"Website Development\"}])"]];
const GROUPS = [
  { title: "Company", description: "How LYONDEV is presented across the website.", keys: ["companyName", "tagline", "aboutSummary", "vision", "mission", "values"] },
  { title: "Contact", description: "Public contact details and business hours.", keys: ["email", "phone", "whatsapp", "address", "addressPubliclyVerified", "hours"] },
  { title: "Social", description: "Links to LYONDEV social profiles.", keys: ["facebook", "twitter", "linkedin"] },
  { title: "Analytics", description: "Measurement configuration.", keys: ["gaId"] },
  { title: "Content", description: "Homepage FAQ content in JSON format.", keys: ["faq"] },
];

export default async function Settings() {
  await requirePerm("*");
  const rows = Object.fromEntries((await db.siteSetting.findMany()).map((r) => [r.key, r.value])) as Record<string, unknown>;
  const imageUrl = (key: string) => typeof rows[key] === "string" ? rows[key] : "";

  return (
    <main>
      <PageHeader title="Settings" description="Manage the business details and content shown on the public website." />
      <form action={saveSettings} className="admin-settings-form">
        {GROUPS.map((group) => (
          <section className="admin-settings-card" key={group.title}>
            <header>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </header>
            <div className={`admin-settings-grid${group.title === "Content" ? " is-content" : ""}`}>
              {KEYS.filter(([key]) => group.keys.includes(key)).map(([key, label]) => (
                <label key={key} className="admin-setting-field">
                  <span>{label}</span>
                  <Textarea
                    name={key}
                    rows={key === "faq" ? 12 : 2}
                    defaultValue={
                      typeof rows[key] === "string"
                        ? rows[key] as string
                        : rows[key]
                          ? JSON.stringify(rows[key], null, 1)
                          : ""
                    }
                    className={key === "faq" ? "admin-faq-json" : ""}
                  />
                </label>
              ))}
            </div>
          </section>
        ))}
        <div className="admin-settings-savebar">
          <Button type="submit">Save settings</Button>
        </div>
      </form>
      <section className="admin-settings-card">
        <header>
          <h2>Homepage images</h2>
          <p>Upload independent images for each homepage section. Portfolio and insight cover images are managed on their individual records.</p>
        </header>
        <div className="admin-image-settings-grid">
          {HOME_IMAGE_SETTINGS.map((setting) => (
            <ImageSettingForm
              key={setting.key}
              settingKey={setting.key}
              title={setting.title}
              description={setting.description}
              currentUrl={imageUrl(setting.key)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
