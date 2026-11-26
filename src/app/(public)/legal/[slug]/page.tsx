import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL_DOCUMENTS } from "@/lib/legal";

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  links?: { label: string; href: string }[];
};

type LegalDocument = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

const documents: Record<string, LegalDocument> = {
  "terms-and-conditions": {
    title: "Terms and Conditions",
    intro: "These working terms describe proposed conditions for using the LYONDEV website and beginning a project. They are not final or effective contractual terms.",
    sections: [
      {
        heading: "Draft status and operator details",
        paragraphs: [
          "Draft for LYONDEV business-owner and Kenyan advocate review. The legal entity or individual contracting with clients, registered business name, physical address, and effective date must be confirmed before publication.",
          "Contact: leonochieng436@gmail.com. Website enquiries can also be submitted through the Contact page.",
        ],
      },
      {
        heading: "Website use",
        paragraphs: [
          "Visitors may use the website for lawful information and enquiries. Do not interfere with the website, attempt unauthorized access, submit malicious code, or misuse another person's information.",
        ],
      },
      {
        heading: "Project agreements",
        paragraphs: [
          "A proposal, statement of work, or other written agreement should identify the parties, deliverables, scope, milestones, fees, payment schedule, dependencies, acceptance process, and any support arrangements. No project-specific obligations should be inferred from general website descriptions.",
          "Before any final terms are published, LYONDEV must confirm its contracting identity, dispute process, governing-law wording, cancellation process, and any consumer-facing disclosures with a Kenyan advocate.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "These draft terms may be revised during review. Questions about the draft can be sent to leonochieng436@gmail.com.",
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy and Data Protection",
    intro: "This draft explains the personal information currently collected through the LYONDEV website and identifies operational details that still require confirmation.",
    sections: [
      {
        heading: "Draft status and contact",
        paragraphs: [
          "Draft for LYONDEV business-owner and Kenyan advocate review. The controller identity, address, retention periods, hosting locations, and any statutory registration obligations have not been independently confirmed.",
          "Privacy enquiries and requests: leonochieng436@gmail.com or the dedicated Privacy Request form.",
        ],
      },
      {
        heading: "Information collected",
        bullets: [
          "Contact and quote enquiries: name, email, phone, country, organization if provided, service, project title, message, budget or timeline if provided, and preferred contact method.",
          "Consultation requests: name, email, phone, consultation type, requested date and time, and project details if provided.",
          "Newsletter subscriptions: email address and the time and version of the affirmative opt-in record. Older records without recorded consent are not treated as consent by this implementation.",
          "Privacy requests: name, email, request category, details supplied by the requester, status, and timestamps.",
          "Admin security: a necessary eight-hour admin session cookie is used for authorized administration. Do not send admin credentials through public forms.",
        ],
      },
      {
        heading: "How information is used",
        paragraphs: [
          "Information is used to respond to enquiries, evaluate and manage requested projects or consultations, administer a newsletter subscription, process privacy requests, secure the administration area, and maintain the website.",
          "Do not include passwords, identity-document numbers, financial account credentials, or other highly sensitive information in public form messages.",
        ],
      },
      {
        heading: "Service providers and transfers",
        paragraphs: [
          "The codebase supports database storage and may use Resend for enquiry notifications and Cloudinary for media hosting when configured. Google Analytics may be configured by an administrator and is loaded only after analytics consent. A Google Maps embed is loaded only after functional consent. Actual providers, hosting regions, data-transfer arrangements, and production configuration must be verified before this draft is finalized.",
          "WhatsApp links are user-initiated links to WhatsApp; LYONDEV does not control that service's processing after a visitor follows the link.",
        ],
      },
      {
        heading: "Retention and security",
        paragraphs: [
          "Records are retained only for an operational, contractual, security, or legal purpose and should be deleted or anonymized when no longer needed. A specific retention schedule, backup deletion cycle, and access-review process remain to be set and approved.",
          "The website uses access controls for administrative records and validation and rate limits on public request forms. No online service can be represented as risk-free; production security and access controls must be reviewed before publication.",
        ],
      },
      {
        heading: "Requests about personal information",
        paragraphs: [
          "You may use the Privacy Request form to ask about personal information held by LYONDEV or request an action such as access, correction, erasure, or objection. LYONDEV may need to verify identity and clarify the request. Do not send identity documents or sensitive details through the form unless specifically requested through a verified channel.",
          "The request process and any applicable response periods or exceptions must be confirmed against current Kenyan law by a Kenyan advocate.",
        ],
      },
      {
        heading: "Legal framework references",
        paragraphs: [
          "The Office of the Data Protection Commissioner lists the Data Protection Act, 2019 and the Data Protection (General), (Registration of Data Controllers and Data Processors), and (Complaints Handling and Enforcement) Regulations, 2021. A Kenyan advocate should also assess the relevance of the Consumer Protection Act, Copyright Act, and Computer Misuse and Cybercrimes Act to LYONDEV's actual operations. These references do not state a legal conclusion or claim that LYONDEV has completed a compliance assessment.",
        ],
        links: [
          { label: "ODPC: Data protection laws in Kenya", href: "https://odpc.go.ke/data-protection-laws-kenya/" },
          { label: "Kenya Law: Laws of Kenya", href: "https://new.kenyalaw.org/legislation/" },
        ],
      },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    intro: "This draft describes the storage and third-party features identified in the current website code review. The production environment and vendor behavior must still be checked.",
    sections: [
      {
        heading: "Draft status",
        paragraphs: [
          "Draft for LYONDEV business-owner and Kenyan advocate review. Cookie policy version 1.0 is used by the consent preference record. Changing that version requires visitors to make a fresh choice.",
        ],
      },
      {
        heading: "Necessary storage",
        bullets: [
          "The admin authentication cookie named lyondev_session is HttpOnly, SameSite=Lax, Secure in production, scoped to the site, and configured for an eight-hour session.",
          "A browser localStorage entry named lyondev-cookie-consent stores the selected categories, policy version, and timestamp. It contains no name, email, or other direct identifier.",
        ],
      },
      {
        heading: "Optional categories",
        bullets: [
          "Functional: enables the optional Google Maps embed on the Contact page after the visitor chooses this category.",
          "Analytics: enables Google Analytics only after the visitor chooses this category and only when an administrator has configured a measurement ID.",
          "Marketing: no marketing tags were found in the reviewed source code. This category must remain unused unless a future vendor and purpose are disclosed and consent behavior is reviewed.",
        ],
      },
      {
        heading: "Manage or withdraw choices",
        paragraphs: [
          "Use Cookie settings in the footer to change or withdraw optional choices. Necessary storage cannot be disabled through this control. Optional analytics is disabled when consent is withdrawn and associated first-party analytics cookies are cleared where accessible.",
          "The current code review found no other browser storage APIs. Recheck the deployed site, extensions, and third-party responses before treating this inventory as complete.",
        ],
      },
    ],
  },
  "acceptable-use": {
    title: "Acceptable Use",
    intro: "These proposed rules are intended to protect visitors, LYONDEV, and the website while the final policy is reviewed.",
    sections: [
      {
        heading: "Permitted use",
        paragraphs: [
          "Use the website lawfully to review information, submit genuine enquiries, and communicate with LYONDEV.",
        ],
      },
      {
        heading: "Prohibited conduct",
        bullets: [
          "Do not attempt to access systems, accounts, or data without authorization.",
          "Do not disrupt service availability, probe or scan systems without written authorization, or introduce malware or harmful code.",
          "Do not submit false, unlawful, abusive, infringing, or unsolicited bulk content, or use forms to collect information about others without authority.",
          "Do not use LYONDEV materials or services to facilitate unlawful activity.",
        ],
      },
      {
        heading: "Reporting",
        paragraphs: [
          "Report suspected website abuse or security concerns to leonochieng436@gmail.com. Do not include passwords or sensitive personal information in an initial report.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro: "This draft clarifies the limited purpose of website information and requires review before it is treated as a final legal disclaimer.",
    sections: [
      {
        heading: "General information",
        paragraphs: [
          "Website content is general information about LYONDEV's services and is not legal, financial, cybersecurity, or other professional advice. A visitor should obtain advice appropriate to their circumstances.",
          "Descriptions, estimates, availability, and indicative pricing may need confirmation for a particular project. A signed or otherwise accepted project agreement should control the agreed scope and terms.",
        ],
      },
      {
        heading: "External services and links",
        paragraphs: [
          "Links and embedded services are provided for convenience. Their operators control their own services and privacy practices. The final policy should define responsibility and limitations only after review under applicable Kenyan law.",
        ],
      },
      {
        heading: "No blanket exclusion",
        paragraphs: [
          "This draft does not attempt to exclude liability where such exclusion would be unlawful. All liability language requires Kenyan advocate review.",
        ],
      },
    ],
  },
  "intellectual-property": {
    title: "Intellectual Property",
    intro: "This draft distinguishes website materials from project deliverables; ownership and licensing must be documented for each engagement.",
    sections: [
      {
        heading: "Website materials",
        paragraphs: [
          "Website text, visual design, and other materials may be protected by intellectual-property rights. No rights are transferred by viewing or downloading public website content, except as allowed by law or with written permission.",
        ],
      },
      {
        heading: "Client project work",
        paragraphs: [
          "The ownership, licence, source-code delivery, third-party components, open-source obligations, and portfolio-use permissions for a client project must be expressly set out in the relevant written agreement. This draft does not promise automatic transfer of ownership or grant LYONDEV portfolio rights.",
        ],
      },
      {
        heading: "Third-party and reported material",
        paragraphs: [
          "Third-party trademarks, software, and content remain subject to their owners' terms. To report a suspected rights issue, contact leonochieng436@gmail.com with enough information to identify the material.",
        ],
      },
    ],
  },
  "service-terms": {
    title: "Service Terms",
    intro: "This working draft identifies project terms to document for website, software, and digital services. A project agreement should be prepared and reviewed for each engagement.",
    sections: [
      {
        heading: "Scope and delivery",
        paragraphs: [
          "Each proposal should specify agreed deliverables, milestones, client dependencies, testing and acceptance, change requests, support, and any third-party services. Timelines depend on the agreed scope and timely access to required content and approvals.",
        ],
      },
      {
        heading: "Published pricing statements requiring confirmation",
        paragraphs: [
          "The current pricing page refers to a 50% deposit and 50% before handover, quotes valid for 14 days, separately billed scope changes and third-party costs, and a 30-day in-scope bug-fix warranty. These existing statements are not independently validated by this draft and must be confirmed by LYONDEV and a Kenyan advocate before being relied on or incorporated into final terms.",
        ],
      },
      {
        heading: "Cancellations, refunds, and support",
        paragraphs: [
          "Cancellation, refund, warranty exclusions, maintenance, hosting, support response times, and service suspension terms are not settled here. Do not add a blanket no-refund term or other unapproved fee. Confirm fair and legally compliant terms for each service before publication.",
        ],
      },
      {
        heading: "Third-party components",
        paragraphs: [
          "Hosting, domains, payment providers, licensed software, and other third-party costs or terms should be identified in the proposal. Their actual providers and client responsibilities must be confirmed for each project.",
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return LEGAL_DOCUMENTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const document = documents[slug];
  if (!document) return {};
  return {
    title: document.title,
    description: document.intro,
    alternates: { canonical: `/legal/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = documents[slug];
  if (!document) notFound();

  return (
    <main className="page-container">
      <div className="mx-auto max-w-4xl">
        <div className="border border-brand/70 bg-[#161616] p-5 text-sm text-brand" role="status">
          <strong>Draft — pending LYONDEV and Kenyan advocate review.</strong>
          <p className="mt-1 text-slate-300">
            This working document is not a final policy or a representation of completed legal compliance.
            Version 0.1 · publication date to be confirmed.
          </p>
        </div>
        <p className="eyebrow-label mt-10">Legal &amp; compliance</p>
        <h1 className="text-white">{document.title}</h1>
        <p className="mt-5 text-slate-300">{document.intro}</p>
        <nav aria-label="Legal documents" className="mt-6 flex flex-wrap gap-3 border-b border-white/10 pb-6 text-sm">
          {LEGAL_DOCUMENTS.map((item) => (
            <Link
              key={item.slug}
              href={`/legal/${item.slug}`}
              className={item.slug === slug ? "text-brand underline" : "text-slate-300 hover:text-brand"}
              aria-current={item.slug === slug ? "page" : undefined}
            >
              {item.title}
            </Link>
          ))}
          <Link href="/privacy-request" className="text-slate-300 hover:text-brand">Privacy request</Link>
        </nav>
        <div className="mt-8 space-y-8">
          {document.sections.map((section) => (
            <section key={section.heading} className="border-l-2 border-brand/70 pl-5">
              <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-slate-300">{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {section.links?.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 mr-5 inline-block text-brand underline"
                >
                  {link.label}
                </a>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">
          For privacy enquiries, email{" "}
          <a className="text-brand underline" href="mailto:leonochieng436@gmail.com">leonochieng436@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
