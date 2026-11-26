import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import SiteNavControls from "./SiteNavControls";
import { serviceWaLink, waLink } from "@/lib/settings";

type Settings = Record<string, unknown>;

function settingText(settings: Settings, key: string) {
  const value = settings[key];
  return typeof value === "string" ? value.trim() : "";
}

export function UtilityBar({ settings }: { settings: Settings }) {
  const phone = settingText(settings, "phone");
  const email = settingText(settings, "email");
  const address =
    settingText(settings, "addressPubliclyVerified").toLowerCase() === "true"
      ? settingText(settings, "address")
      : "";
  const whatsapp = settingText(settings, "whatsapp");
  const socialLinks = [
    ["facebook", "Facebook"],
    ["twitter", "X"],
    ["linkedin", "LinkedIn"],
  ] as const;
  const hasContact = phone || email || address || whatsapp;

  if (!hasContact && !socialLinks.some(([key]) => settingText(settings, key))) return null;

  return (
    <div className="border-b border-white/10 bg-ink text-xs text-slate-300 sm:text-sm">
      <div className="container-custom flex min-h-10 flex-nowrap items-center justify-between gap-x-5 py-2">
        <div className="flex min-w-0 flex-nowrap items-center gap-x-5">
          {phone && (
            <a className="inline-flex items-center gap-2 hover:text-white" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
              <Phone className="h-3.5 w-3.5 text-brand" aria-hidden="true" /> {phone}
            </a>
          )}
          {email && (
            <a className="hidden items-center gap-2 whitespace-nowrap hover:text-white md:inline-flex" href={`mailto:${email}`}>
              <Mail className="h-3.5 w-3.5 text-brand" aria-hidden="true" /> {email}
            </a>
          )}
          {address && (
            <span className="hidden items-center gap-2 whitespace-nowrap lg:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" /> {address}
            </span>
          )}
          {whatsapp && (
            <a
              className="inline-flex items-center gap-2 hover:text-white"
              href={waLink(whatsapp, "Hello LYONDEV, I would like to make an enquiry about your services.")}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-3.5 w-3.5 text-brand" aria-hidden="true" /> WhatsApp
            </a>
          )}
        </div>
        <div className="hidden shrink-0 items-center gap-4 sm:flex">
          {socialLinks.map(([key, label]) => {
            const href = settingText(settings, key);
            return href ? (
              <a key={key} href={href} target="_blank" rel="noreferrer" className="hover:text-white">
                {label}
              </a>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export function SiteNav({
  services,
  solutions,
}: {
  services: { title: string; slug: string }[];
  solutions: { name: string; slug: string }[];
}) {
  return (
    <div className="relative z-50 border-b border-white/10 bg-ink text-white">
      <nav aria-label="Main navigation" className="container-custom flex min-h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="LyonDev home" className="flex min-h-[4.5rem] items-center border-b-2 border-brand px-1 font-head text-lg font-extrabold tracking-tight text-white sm:px-2">
          LYONDEV
        </Link>
        <SiteNavControls services={services} solutions={solutions} />
      </nav>
    </div>
  );
}

export function Button({
  href,
  children,
  className = "",
  variant = "primary",
  type = "button",
  target,
  rel,
  analyticsEvent,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
  target?: "_blank" | "_self";
  rel?: string;
  analyticsEvent?: string;
}) {
  const styles = `inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan sm:px-5 ${
    variant === "primary"
      ? "bg-brand text-black hover:bg-cyan"
      : "border border-white/25 text-white hover:border-cyan hover:text-cyan"
  } ${className}`;

  return href ? (
    <Link href={href} className={styles} target={target} rel={rel} data-analytics-event={analyticsEvent}>
      {children}
    </Link>
  ) : (
    <button type={type} className={styles} data-analytics-event={analyticsEvent}>
      {children}
    </button>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`section-padding ${className}`}>
      <div className="container-custom">
        {eyebrow && (
          <p className="eyebrow-label">{eyebrow}</p>
        )}
        <h2 className="section-heading text-white">
          {title}
        </h2>
        <span className="mt-4 block h-1 w-14 bg-brand" aria-hidden="true" />
        {children}
      </div>
    </section>
  );
}

export function CornerMarker() {
  return <span className="corner-marker mb-5 block h-3 w-12" aria-hidden="true" />;
}

export function OutlineFrameImage({
  src,
  alt,
  className = "",
  badge,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  badge?: string;
}) {
  return (
    <div className={`frame-offset dot-pattern relative isolate ${className}`}>
      <div className="relative min-h-72 overflow-hidden bg-gradient-to-br from-slate-800 via-navy to-slate-950 sm:min-h-96">
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
        {!src && (
          <div
            className="image-fallback absolute inset-0"
            role="img"
            aria-label={alt}
          />
        )}
      </div>
      {badge && (
        <span className="absolute -bottom-5 right-4 z-10 max-w-[13rem] bg-brand px-5 py-4 text-sm font-bold text-white sm:right-6">
          {badge}
        </span>
      )}
    </div>
  );
}

export function FeatureGrid({ features }: { features: string[] }) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
          <Plus className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechStrip() {
  const technologies = [
    "Next.js",
    "PostgreSQL",
    "M-Pesa Daraja",
    "WhatsApp",
    "Cloudinary",
    "Vercel",
  ];

  return (
    <section aria-label="Technologies and integrations" className="border-y border-white/10 py-8">
      <div className="container-custom flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-between">
        {technologies.map((technology) => (
          <span key={technology} className="text-sm font-semibold tracking-wide text-slate-400 sm:text-base">
            {technology}
          </span>
        ))}
      </div>
    </section>
  );
}

export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 border-l border-cyan/70 bg-navy/70 px-2 py-2 backdrop-blur-sm sm:min-w-36 sm:px-4 sm:py-3">
      <p className="stat-value font-head text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-300">{label}</p>
    </div>
  );
}

export function HeroFrame({
  image,
  children,
}: {
  image?: string | null;
  children: React.ReactNode;
}) {
  return (
    <section className="hero-enter relative isolate overflow-hidden bg-navy text-white">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="-z-20 object-cover"
        />
      ) : (
        <div className="hero-grid absolute inset-0 -z-20" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/60" />
      <div className="absolute inset-0 -z-10 bg-ink/20" />
      <div className="container-custom grid min-h-[42rem] items-center gap-8 py-12 sm:gap-12 sm:py-16 lg:min-h-[46rem] lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:py-20 xl:grid-cols-[1.35fr_0.65fr] xl:gap-16">
        {children}
      </div>
    </section>
  );
}

export function SpecializationsSplit({
  services,
  image,
}: {
  services: { id: string; title: string; summary: string }[];
  image?: string | null;
}) {
  return (
    <Section title="Our specializations" className="bg-navy">
      <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-1 lg:order-1">
          <OutlineFrameImage
            src={image}
            alt="LyonDev technology and software work"
            className="mr-3 sm:mr-5"
            badge={`${services.length} unique services`}
          />
        </div>
        <div className="order-2 border border-white/10 bg-card p-6 sm:p-9">
          <h3 className="font-head text-2xl font-bold text-white sm:text-3xl">
            Digital services shaped around your business
          </h3>
          <ul className="mt-7 divide-y divide-white/10">
            {services.map((service) => (
              <li key={service.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white">{service.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{service.summary}</p>
                  <a
                    href={serviceWaLink(service.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-cyan"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Enquire about this service
                  </a>
                </div>
              </li>
            ))}
            {services.length === 0 && (
              <li className="py-4 text-sm text-slate-300">Service information will appear here soon.</li>
            )}
          </ul>
          <Link
            href="/services"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan"
          >
            Explore all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
