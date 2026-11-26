import type { Metadata } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL = (configuredSiteUrl ?? "https://lyondev-nu.vercel.app").replace(/\/+$/, "");

export const COMPANY_DESCRIPTION =
  "Nairobi-based LYONDEV builds professional websites, custom software and eCommerce solutions for businesses across Kenya.";

export function metaDescription(value: string, maxLength = 160) {
  const description = value.replace(/\s+/g, " ").trim();
  if (description.length <= maxLength) return description;

  const truncated = description.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > maxLength * 0.75 ? lastSpace : truncated.length).trimEnd()}...`;
}

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function socialMetadata(path: string): Pick<Metadata, "openGraph"> {
  return {
    openGraph: {
      siteName: "LYONDEV",
      type: "website",
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "LYONDEV — Web Development & Custom Software Solutions in Nairobi, Kenya",
        },
      ],
    },
  };
}

export type ServiceLandingContent = {
  title: string;
  description: string;
  heading: string;
  introduction: string;
  bestFor: string;
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const SERVICE_LANDING_CONTENT: Record<string, ServiceLandingContent> = {
  "website-development": {
    title: "Website Development Company in Nairobi, Kenya | LYONDEV",
    description:
      "LYONDEV builds professional, responsive websites for businesses in Nairobi and across Kenya, including corporate, service and eCommerce platforms.",
    heading: "Professional Website Development Services in Nairobi, Kenya.",
    introduction:
      "A clear, well-built website helps people understand your business and take the next step. LYONDEV plans and develops responsive websites around your audience, content and business goals, for businesses in Nairobi and across Kenya.",
    bestFor:
      "Startups, small and medium-sized businesses, institutions and established organizations that need a professional website or a better digital experience.",
    deliverables: [
      "Responsive page layouts and navigation",
      "Content structure and clear enquiry paths",
      "Search-friendly technical foundations",
      "Deployment guidance and agreed post-launch support",
    ],
    faqs: [
      {
        question: "Can a website be tailored to my business?",
        answer:
          "Yes. The page structure, content needs and features are planned around your organization and the outcomes you want from the website.",
      },
      {
        question: "Can you work with a Nairobi business remotely?",
        answer:
          "Yes. Discovery, reviews and project communication can be handled online, whether your business is in Nairobi or elsewhere in Kenya.",
      },
    ],
    related: ["ecommerce-development", "custom-software", "ui-ux-design"],
  },
  "custom-software": {
    title: "Custom Software Development Company in Kenya | LYONDEV",
    description:
      "LYONDEV designs custom business software for organizations in Nairobi and across Kenya, including workflow, inventory and management systems.",
    heading: "Custom Software Development Solutions for Kenyan Businesses.",
    introduction:
      "When off-the-shelf tools do not fit the way your organization works, custom software can bring important workflows into one purpose-built system. LYONDEV works with you to understand the process first, then plans and develops software to suit your operational needs.",
    bestFor:
      "Organizations with repeatable workflows, disconnected tools or business processes that need a more purpose-built digital system.",
    deliverables: [
      "Requirements and workflow discovery",
      "Application structure and role-based access planning",
      "Business dashboards, records and workflow features",
      "Testing, deployment and agreed technical support",
    ],
    faqs: [
      {
        question: "What kinds of business software can you develop?",
        answer:
          "Project scope can include management, inventory, POS, CRM, ERP or other workflow applications. The right features depend on your requirements.",
      },
      {
        question: "Can custom software connect to existing services?",
        answer:
          "Where a service provides a suitable integration interface, its APIs and data flows can be assessed as part of project planning.",
      },
    ],
    related: ["api-development", "ai-automation", "website-development"],
  },
  "ecommerce-development": {
    title: "eCommerce Website Development in Kenya | LYONDEV",
    description:
      "Build an eCommerce website for your Kenyan business with product, order and payment workflows planned around your customers and operations.",
    heading: "Professional eCommerce Website Development in Kenya.",
    introduction:
      "An online store needs more than a product catalogue: customers need a clear path from discovery to checkout, while your team needs practical ways to manage orders. LYONDEV plans eCommerce websites around your products, fulfilment process and payment requirements.",
    bestFor:
      "Retailers, wholesalers and growing businesses that want to sell products online or improve an existing store.",
    deliverables: [
      "Product catalogue and category structure",
      "Shopping cart and checkout experience",
      "Order management and payment integration planning",
      "Mobile-friendly storefront and store administration",
    ],
    faqs: [
      {
        question: "Can an online store support local payment options?",
        answer:
          "Payment options are selected during discovery. M-Pesa or other gateways can be considered where the provider and project requirements support the integration.",
      },
      {
        question: "Can you build a store around an existing catalogue?",
        answer:
          "Yes. Product information, categories and inventory needs can be reviewed during planning to determine how the catalogue should be organized.",
      },
    ],
    related: ["website-development", "custom-software", "api-development"],
  },
  "mobile-app-development": {
    title: "Mobile App Development Company in Kenya | LYONDEV",
    description:
      "Plan and develop mobile applications for businesses in Nairobi and Kenya, with product requirements, user experience and integrations considered.",
    heading: "Mobile Application Development Solutions in Kenya.",
    introduction:
      "A useful mobile application starts with a clear user need and a well-defined product scope. LYONDEV helps organizations plan mobile experiences, application features and supporting services for customers, staff or operational teams.",
    bestFor:
      "Businesses and organizations that need a mobile-first customer experience, field workflow or companion application for an existing service.",
    deliverables: [
      "Product and user-flow planning",
      "Interface design for mobile screens",
      "Application and backend integration planning",
      "Testing and release preparation",
    ],
    faqs: [
      {
        question: "Can a mobile app use an existing website or system?",
        answer:
          "It may be possible when the existing system exposes suitable APIs. The integration approach should be confirmed during technical discovery.",
      },
      {
        question: "Do you develop for both Android and iOS?",
        answer:
          "Platform choices depend on your users, features, budget and maintenance needs. These trade-offs are reviewed before implementation.",
      },
    ],
    related: ["ui-ux-design", "api-development", "custom-software"],
  },
  "ui-ux-design": {
    title: "UI/UX Design Services in Nairobi, Kenya | LYONDEV",
    description:
      "LYONDEV plans user-focused interface and experience design for websites and applications serving businesses in Nairobi and across Kenya.",
    heading: "Professional UI/UX Design for Websites and Applications.",
    introduction:
      "Good interface design makes important tasks easier to understand and complete. LYONDEV uses project discovery, information structure and interface design to shape accessible, consistent experiences for websites and applications.",
    bestFor:
      "Teams planning a new digital product or improving the usability, navigation and visual consistency of an existing website or application.",
    deliverables: [
      "User journeys and information architecture",
      "Wireframes and interface concepts",
      "Responsive component and page design",
      "Design handoff aligned with the implementation scope",
    ],
    faqs: [
      {
        question: "Can you redesign an existing website or application?",
        answer:
          "Yes. The current experience, content and user tasks can be reviewed to identify design improvements and a practical redesign scope.",
      },
      {
        question: "Does UI/UX design include development?",
        answer:
          "Design and development can be scoped together or separately. The proposal should make the agreed deliverables clear.",
      },
    ],
    related: ["website-development", "mobile-app-development", "custom-software"],
  },
  "api-development": {
    title: "API Development & System Integration in Kenya | LYONDEV",
    description:
      "LYONDEV plans API development and system integrations for businesses connecting websites, applications, payments and operational software.",
    heading: "Custom API Development and System Integration Solutions.",
    introduction:
      "APIs allow applications to exchange information and coordinate workflows. LYONDEV reviews the systems involved, available interfaces and data requirements before designing an integration approach for organizations in Nairobi and across Kenya.",
    bestFor:
      "Organizations connecting internal software, websites, mobile applications, payment services or other third-party platforms.",
    deliverables: [
      "Integration requirements and data-flow review",
      "API endpoint and authentication planning",
      "Application-to-application integration",
      "Testing, error handling and implementation documentation",
    ],
    faqs: [
      {
        question: "Can you integrate a third-party platform?",
        answer:
          "Integrations depend on the platform's API availability, access permissions and technical requirements. These are assessed before work is scoped.",
      },
      {
        question: "Can APIs connect a website to business software?",
        answer:
          "Yes, where both systems provide appropriate interfaces. The data that should move between systems is defined during discovery.",
      },
    ],
    related: ["custom-software", "ecommerce-development", "ai-automation"],
  },
  "ai-automation": {
    title: "Business Automation & AI Solutions in Kenya | LYONDEV",
    description:
      "Explore practical business automation and AI solutions for organizations in Nairobi and Kenya, planned around workflows and measurable needs.",
    heading: "AI and Business Process Automation Solutions for Modern Businesses.",
    introduction:
      "Automation is most valuable when it reduces repetitive work without making a process harder to manage. LYONDEV reviews business workflows and identifies suitable integrations or automation opportunities before recommending an implementation.",
    bestFor:
      "Teams with repeatable administrative tasks, multi-step workflows or systems that need to exchange information more efficiently.",
    deliverables: [
      "Workflow discovery and automation suitability review",
      "Integration and data-flow planning",
      "Automation implementation aligned with agreed scope",
      "Testing, handover and maintenance planning",
    ],
    faqs: [
      {
        question: "Which business processes can be automated?",
        answer:
          "Suitable tasks depend on the workflow, existing systems and available integrations. Each opportunity should be assessed for reliability and business value.",
      },
      {
        question: "Does every project need AI?",
        answer:
          "No. A rules-based workflow or system integration may be more appropriate. Technology choices are based on the problem, not a requirement to use AI.",
      },
    ],
    related: ["custom-software", "api-development", "cybersecurity"],
  },
  cybersecurity: {
    title: "Cybersecurity & IT Solutions Company in Nairobi | LYONDEV",
    description:
      "LYONDEV provides practical cybersecurity and IT solutions for businesses in Nairobi and across Kenya, with scope based on authorized requirements.",
    heading: "Professional Cybersecurity and IT Solutions for Businesses.",
    introduction:
      "Technology security and reliability require clear scope and responsible access. LYONDEV can help organizations review selected systems, plan practical safeguards and address agreed IT or infrastructure needs.",
    bestFor:
      "Organizations seeking authorized security guidance, infrastructure improvements, backup planning or technical support.",
    deliverables: [
      "Authorized, agreed-scope security review",
      "Practical risk and improvement recommendations",
      "Backup and access-control planning",
      "Technical support scoped to your environment",
    ],
    faqs: [
      {
        question: "Are security reviews performed with authorization?",
        answer:
          "Yes. Security work must have clear written authorization, defined systems and an agreed scope before any assessment begins.",
      },
      {
        question: "Can you help plan backups and access controls?",
        answer:
          "Backup and access-control needs can be reviewed and recommendations can be scoped to your systems and operational requirements.",
      },
    ],
    related: ["cloud-infrastructure", "custom-software", "api-development"],
  },
  "digital-marketing": {
    title: "SEO & Digital Marketing Services in Nairobi, Kenya | LYONDEV",
    description:
      "Improve your website's technical SEO and online visibility with digital growth services for businesses in Nairobi and across Kenya.",
    heading: "Search Engine Optimization and Digital Growth Services in Kenya.",
    introduction:
      "Search visibility depends on useful content, sound technical foundations and a clear understanding of what customers are looking for. LYONDEV helps businesses improve website discoverability and plan practical digital visibility work.",
    bestFor:
      "Organizations improving their website structure, local search information, technical SEO or digital measurement.",
    deliverables: [
      "Technical and on-page SEO review",
      "Page titles, descriptions and internal-link recommendations",
      "Local search profile readiness guidance",
      "Analytics and measurement setup where configured",
    ],
    faqs: [
      {
        question: "Can SEO guarantee a specific Google ranking?",
        answer:
          "No. Search rankings depend on many factors outside any provider's control. SEO work improves site quality and discoverability but cannot guarantee positions or traffic.",
      },
      {
        question: "Can you help a business targeting Nairobi searches?",
        answer:
          "Yes. Local page content, consistent business information and technical SEO can be planned for an eligible business and its genuine service area.",
      },
    ],
    related: ["website-development", "ecommerce-development", "custom-software"],
  },
  "cloud-infrastructure": {
    title: "Cloud Solutions & Website Maintenance in Kenya | LYONDEV",
    description:
      "Plan cloud hosting, deployment, backups and technical maintenance for websites and applications used by businesses in Kenya.",
    heading: "Cloud Solutions, Website Hosting and Technical Support.",
    introduction:
      "Reliable digital services depend on suitable hosting, careful deployments and ongoing maintenance. LYONDEV helps businesses review infrastructure needs and plan support around their websites, databases and applications.",
    bestFor:
      "Organizations launching a digital product, improving an existing deployment or planning ongoing technical maintenance.",
    deliverables: [
      "Hosting and deployment requirements review",
      "Environment and release planning",
      "Backup and maintenance recommendations",
      "Technical support based on an agreed service scope",
    ],
    faqs: [
      {
        question: "Can you maintain an existing website?",
        answer:
          "Existing sites can be reviewed first so that the technology, access requirements and maintenance scope are understood.",
      },
      {
        question: "Do you provide a fixed hosting plan for every project?",
        answer:
          "No. Hosting requirements vary with the application, usage, integrations and operating needs, so the appropriate setup is determined per project.",
      },
    ],
    related: ["cybersecurity", "website-development", "custom-software"],
  },
};

export function serviceLandingContent(slug: string, title: string, summary: string): ServiceLandingContent {
  return (
    SERVICE_LANDING_CONTENT[slug] ?? {
      title: `${title} | LYONDEV`,
      description: `${summary} LYONDEV supports businesses in Nairobi and across Kenya.`,
      heading: `${title} for Businesses in Nairobi and Across Kenya.`,
      introduction: `${summary} LYONDEV scopes this service around your organization's requirements, users and operational context.`,
      bestFor: "Businesses and organizations evaluating a digital solution for their operational needs.",
      deliverables: [],
      faqs: [],
      related: [],
    }
  );
}
