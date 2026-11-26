import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import Link from "next/link";
import { Facebook, Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";
import { db } from "@/lib/db";
import { getSettings, LYONDEV_WHATSAPP_DISPLAY, waLink } from "@/lib/settings";
import ContactForm from "@/components/ContactForm";
import ContactInfoBlock from "@/components/ContactInfoBlock";
import JsonLd from "@/components/JsonLd";
import PageHeading from "@/components/PageHeading";
import ConsentMap from "@/components/legal/ConsentMap";

export const metadata: Metadata = {
  title: {
    absolute: "Contact LYONDEV | Web & Software Development in Nairobi",
  },
  description:
    "Contact LYONDEV in Nairobi, Kenya for professional website development, custom software, eCommerce and digital solutions. Discuss your project with our team.",
  alternates: { canonical: "/contact" },
  ...socialMetadata("/contact"),
};

type ContactPageProps = {
  searchParams: Promise<{ service?: string | string[] }>;
};

const socialLinks = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "twitter", label: "X", Icon: Twitter },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
] as const;

function settingText(settings: Record<string, unknown>, key: string) {
  const value = settings[key];
  return typeof value === "string" ? value.trim() : "";
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [settings, services, params] = await Promise.all([
    getSettings(),
    db.service.findMany({
      where: { status: "PUBLISHED" },
      select: { id: true, title: true },
      orderBy: { sortOrder: "asc" },
    }),
    searchParams,
  ]);

  const companyName = settingText(settings, "companyName");
  const email = settingText(settings, "email");
  const phone = settingText(settings, "phone");
  const whatsapp = settingText(settings, "whatsapp");
  const whatsappHref = waLink(whatsapp);
  const address =
    settingText(settings, "addressPubliclyVerified").toLowerCase() === "true"
      ? settingText(settings, "address")
      : "";
  const hours = settingText(settings, "hours");
  const configuredSocialLinks = socialLinks.flatMap(({ key, label, Icon }) => {
    const href = settingText(settings, key);
    return href ? [{ key, label, Icon, href }] : [];
  });
  const requestedService = Array.isArray(params.service) ? params.service[0] : params.service;
  const selectedService =
    services.find((service) => service.title.toLowerCase() === requestedService?.trim().toLowerCase())
      ?.title ?? "General enquiry";

  const contactPoint = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    ...(companyName ? { name: companyName } : {}),
    contactType: "customer service",
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
  };

  return (
    <main className="contact-page relative isolate overflow-hidden bg-ink text-white">
      {(email || phone) && <JsonLd data={contactPoint} />}
      <div className="contact-backdrop" aria-hidden="true">
        {address ? (
          <ConsentMap address={address} />
        ) : (
          <div className="contact-map-pattern" />
        )}
        <div className="contact-map-overlay" />
      </div>

      <div className="contact-page-content container-custom flex min-h-[calc(100vh-7rem)] flex-col py-12 sm:py-16 lg:py-20">
        <PageHeading title="Let's Build Something Great Together" />
        <p className="mb-10 max-w-3xl text-base leading-7 text-slate-300 sm:mb-12 sm:text-lg">
          Have a project in mind? Whether you need a professional website, custom software, an eCommerce platform, or a complete digital solution, LYONDEV is ready to help turn your ideas into reality.
        </p>

        <div className="grid flex-1 items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="order-2 space-y-8 lg:order-1">
            {hours && (
              <ContactInfoBlock label="Business hours">
                <p className="whitespace-pre-line">{hours}</p>
              </ContactInfoBlock>
            )}

            {address && (
              <ContactInfoBlock label="Office">
                <p className="whitespace-pre-line">{address}</p>
              </ContactInfoBlock>
            )}

            {(email || phone || whatsapp) && (
              <ContactInfoBlock label="Contact LYONDEV">
                <div className="space-y-3">
                  {email && (
                    <a className="inline-flex break-all text-white hover:text-brand" href={`mailto:${email}`}>
                      {email}
                    </a>
                  )}
                  {phone && (
                    <a
                      className="block text-white hover:text-brand"
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    >
                      {phone}
                    </a>
                  )}
                  {whatsappHref && (
                    <a
                      className="block text-white hover:text-brand"
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp: {LYONDEV_WHATSAPP_DISPLAY}
                    </a>
                  )}
                </div>
              </ContactInfoBlock>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan"
                href={waLink(whatsapp, "Hello LYONDEV, I would like to schedule a consultation to discuss my project.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat with us on WhatsApp
              </a>
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
                href={`mailto:${email}?subject=${encodeURIComponent("Project consultation with LYONDEV")}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Email for a consultation
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="contact-secondary-link" href="/request-quote">
                Request a Quote
              </Link>
              <Link className="contact-secondary-link" href="/book-consultation">
                Book a Consultation
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <ContactForm
              services={services.map(({ id, title }) => ({ id, title }))}
              selectedService={selectedService}
              whatsapp={whatsapp}
            />
          </div>
        </div>

        <footer className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-5 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          {configuredSocialLinks.length > 0 && (
            <nav aria-label="Social media" className="flex items-center gap-5">
              {configuredSocialLinks.map(({ key, label, Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 transition-colors hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          )}
          <p className="sm:ml-auto">
            © {new Date().getFullYear()}
            {companyName ? ` ${companyName}` : ""}. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
