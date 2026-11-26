import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Eye,
  GraduationCap,
  HeartPulse,
  Layers,
  Lightbulb,
  Mail,
  MessageCircle,
  Monitor,
  Network,
  Palette,
  Plug,
  Rocket,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Store,
  Target,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { LYONDEV_EMAIL, waLink } from "@/lib/settings";

export const metadata: Metadata = {
  title: { absolute: "About LYONDEV | Nairobi Web & Software Company" },
  description:
    "Learn about LYONDEV, a Nairobi-based company developing websites, custom software and digital solutions for Kenyan businesses.",
  alternates: { canonical: "/about" },
  ...socialMetadata("/about"),
};

const VALUES = [
  {
    title: "Innovation",
    description:
      "We embrace modern technologies, fresh ideas and creative approaches to solve challenges and create better digital experiences.",
    Icon: Lightbulb,
  },
  {
    title: "Excellence",
    description:
      "We are committed to quality through careful planning, thoughtful design, sound engineering and continuous improvement.",
    Icon: Target,
  },
  {
    title: "Integrity",
    description:
      "We value honesty, transparency and accountability in our communication, project execution and professional relationships.",
    Icon: Shield,
  },
  {
    title: "Customer Focus",
    description:
      "We put our clients' objectives at the centre of our work, developing solutions that address their actual needs and priorities.",
    Icon: Users,
  },
  {
    title: "Reliability",
    description:
      "We believe technology should be dependable. We prioritize performance, security, maintainability and responsible technical support.",
    Icon: CheckCircle2,
  },
  {
    title: "Continuous Growth",
    description:
      "We continuously learn, adapt and improve our capabilities to remain relevant in a rapidly evolving technology landscape.",
    Icon: Zap,
  },
];

const EXPERTISE = [
  {
    title: "Website Development",
    description:
      "Professional, responsive and SEO-friendly websites that strengthen online presence and customer engagement.",
    href: "/services/website-development",
    Icon: Monitor,
  },
  {
    title: "Custom Software Engineering",
    description:
      "Tailored applications and business management systems designed around organizational workflows.",
    href: "/services/custom-software",
    Icon: Code2,
  },
  {
    title: "eCommerce Development",
    description:
      "Digital commerce platforms that simplify product management, online shopping, order processing and payments.",
    href: "/services/website-development",
    Icon: ShoppingCart,
  },
  {
    title: "Mobile Applications",
    description:
      "Android, iOS and cross-platform applications designed to connect businesses with their customers.",
    href: "/services/mobile-app-development",
    Icon: Smartphone,
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive and engaging interfaces that improve usability and create better digital experiences.",
    href: "/services/ui-ux-design",
    Icon: Palette,
  },
  {
    title: "System Integration",
    description:
      "APIs, payment integrations and connected systems that help different applications work together.",
    href: "/services/ai-automation",
    Icon: Plug,
  },
  {
    title: "AI & Automation",
    description:
      "Intelligent technology and automated workflows that improve productivity and simplify business processes.",
    href: "/services/ai-automation",
    Icon: BrainCircuit,
  },
  {
    title: "Cybersecurity & IT",
    description:
      "Technology security assessments, infrastructure support and practical IT solutions.",
    href: "/services/cybersecurity",
    Icon: Shield,
  },
  {
    title: "SEO & Digital Growth",
    description:
      "Search optimization and digital visibility services that help businesses reach their target audiences.",
    href: "/services/digital-marketing",
    Icon: Search,
  },
  {
    title: "Cloud & Technical Support",
    description:
      "Cloud infrastructure, hosting management, database administration and ongoing technical maintenance.",
    href: "/services/cloud-infrastructure",
    Icon: Cloud,
  },
];

const PROCESS = [
  {
    title: "Discover",
    description:
      "We begin by understanding your business, objectives, challenges and expectations to identify the right solution.",
  },
  {
    title: "Plan",
    description:
      "We define the project scope, technical requirements, architecture, functionality and delivery priorities.",
  },
  {
    title: "Design",
    description:
      "We develop user-focused interfaces and solution designs that prioritize usability, accessibility and your brand.",
  },
  {
    title: "Develop",
    description:
      "We turn approved designs and requirements into functional solutions using modern technologies and practices.",
  },
  {
    title: "Launch & Support",
    description:
      "We test, deploy and deliver the solution, followed by agreed technical support, maintenance and improvements.",
  },
];

const TECHNOLOGIES = [
  {
    title: "Frontend development",
    Icon: Monitor,
    items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend development",
    Icon: Workflow,
    items: ["Node.js", "API development", "Server-side applications", "Authentication & authorization"],
  },
  {
    title: "Databases & data",
    Icon: Database,
    items: ["PostgreSQL", "MySQL", "Prisma ORM", "Database design & optimization"],
  },
  {
    title: "Cloud & deployment",
    Icon: Cloud,
    items: ["Vercel", "Cloud hosting", "Cloud storage integration", "Deployment workflows"],
  },
  {
    title: "Integrations",
    Icon: Network,
    items: ["Payment gateways", "M-Pesa Daraja API", "Third-party APIs", "Email & messaging services"],
  },
];

const BENEFITS = [
  {
    title: "Business-oriented solutions",
    description: "We understand your requirements before recommending or developing a solution.",
  },
  {
    title: "Customized development",
    description: "We build around your workflows and objectives rather than forcing a generic system.",
  },
  {
    title: "Modern technology",
    description: "We use contemporary frameworks and practices to create maintainable products.",
  },
  {
    title: "User-focused design",
    description: "We prioritize intuitive interfaces and seamless experiences across devices.",
  },
  {
    title: "Scalable architecture",
    description: "We consider future requirements when designing and developing your platforms.",
  },
  {
    title: "Ongoing technical support",
    description: "We provide agreed maintenance and assistance to help keep your solutions operating effectively.",
  },
];

const AUDIENCES = [
  {
    title: "Startups & entrepreneurs",
    description: "Turning innovative ideas into functional digital products.",
    Icon: Rocket,
  },
  {
    title: "Small & medium businesses",
    description: "Improving operations and establishing a strong digital presence.",
    Icon: Briefcase,
  },
  {
    title: "Retailers & wholesalers",
    description: "Streamlining sales, stock management and business processes.",
    Icon: Store,
  },
  {
    title: "Educational institutions",
    description: "Supporting digital administration and institutional management.",
    Icon: GraduationCap,
  },
  {
    title: "Healthcare organizations",
    description: "Developing appropriate digital systems for operational management.",
    Icon: HeartPulse,
  },
  {
    title: "Enterprises & organizations",
    description: "Delivering customized applications and integrated technology solutions.",
    Icon: Building2,
  },
];

const COMMITMENT_PRINCIPLES = [
  { title: "Clear communication", Icon: MessageCircle },
  { title: "Quality-driven development", Icon: Code2 },
  { title: "Long-term value", Icon: Lightbulb },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="eyebrow-label">{eyebrow}</p>
      <h2 className="section-heading text-white">{title}</h2>
      <span className="about-strip mt-5 block h-1 w-14 bg-brand" aria-hidden="true" />
      {description && <p className="section-description mt-5">{description}</p>}
    </div>
  );
}

function EngineeringVisual() {
  return (
    <div
      role="img"
      aria-label="Abstract illustration of connected software components"
      className="about-visual relative isolate mx-auto w-full max-w-xl"
    >
      <div className="about-visual-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="relative border border-white/10 bg-card/95 p-4 shadow-2xl shadow-black/50 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
            LYONDEV / ENGINEERING
          </span>
        </div>
        <div className="grid gap-4 py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="border border-brand/30 bg-black/70 p-4">
            <Code2 className="h-5 w-5 text-brand" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-white">Business needs</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Understand the challenge</p>
          </div>
          <ArrowRight className="mx-auto hidden h-5 w-5 text-brand sm:block" aria-hidden="true" />
          <div className="border border-white/10 bg-black/70 p-4">
            <Layers className="h-5 w-5 text-brand" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-white">Digital solution</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Design, build and support</p>
          </div>
        </div>
        <div className="border-l-2 border-brand bg-white/[0.03] px-4 py-3 font-mono text-xs leading-6 text-slate-400 sm:text-sm">
          <p><span className="text-brand">const</span> solution = buildFor(realNeeds);</p>
          <p><span className="text-brand">return</span> usefulTechnology(solution);</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Design", "Engineering", "Integration", "Growth"].map((item) => (
            <span key={item} className="border border-white/10 px-2.5 py-1 text-[11px] text-slate-300">
              {item}
            </span>
          ))}
        </div>
      </div>
      <span className="about-visual-corner absolute -bottom-4 -right-3 h-16 w-16 border-b-2 border-r-2 border-brand sm:-right-5" aria-hidden="true" />
    </div>
  );
}

export default function AboutPage() {
  const aboutWhatsApp = waLink(
    undefined,
    "Hello LYONDEV, I have visited your About page and would like to discuss a potential project.",
  );

  return (
    <main className="about-page scroll-smooth">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="about-hero-glow absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-custom grid min-h-[38rem] items-center gap-14 py-16 sm:py-20 lg:min-h-[44rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div className="about-reveal">
            <p className="eyebrow-label">About LYONDEV <span className="px-1 text-slate-500">|</span> Who we are</p>
            <h1 className="max-w-3xl font-head text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              We Build <span className="text-brand">Technology</span> That Turns Ideas Into <span className="text-brand">Impact.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Based in Nairobi, Kenya, LYONDEV is a technology company that believes technology should do more than simply exist. It should solve problems, create opportunities and drive meaningful progress. We design and develop modern websites, intelligent software systems and scalable digital solutions that help businesses operate smarter and achieve more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#our-story"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan"
              >
                Discover our story <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
              >
                Work with us
              </Link>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Technology. Innovation. Growth.
            </p>
          </div>
          <div className="about-reveal lg:pl-3">
            <EngineeringVisual />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand/70 to-transparent" aria-hidden="true" />
      </section>

      <section id="who-we-are" className="about-reveal section-padding scroll-mt-24 bg-navy">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" title="Technology Built Around Real Business Needs." />
            <div className="mt-7 space-y-4 text-base leading-7 text-slate-300">
              <p>LYONDEV is a Nairobi-based Kenyan technology and software development company committed to helping businesses embrace the opportunities of the digital world.</p>
              <p>We work with businesses, entrepreneurs, startups and organizations to transform ideas, challenges and operational requirements into practical digital solutions.</p>
              <p>Our work combines software engineering, modern web technologies, creative design and business-focused problem-solving to deliver solutions that are functional, reliable and scalable.</p>
              <p>From establishing a business&apos;s first professional online presence to developing sophisticated business management platforms, we approach every project with a focus on quality, usability and long-term value.</p>
              <p>At LYONDEV, we do not simply build digital products. We create technology that supports business operations, improves customer experiences and opens new opportunities for growth.</p>
            </div>
          </div>
          <EngineeringVisual />
        </div>
      </section>

      <section id="our-story" className="about-reveal section-padding scroll-mt-24 bg-ink">
        <div className="container-custom grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title="Driven by Innovation. Inspired by Possibility." />
            <div className="mt-8 hidden h-32 w-px bg-gradient-to-b from-brand to-transparent lg:block" aria-hidden="true" />
          </div>
          <div className="max-w-3xl border-l-2 border-brand pl-6 sm:pl-8">
            <p className="text-lg leading-8 text-white">
              LYONDEV was established around a simple idea: technology should be accessible, practical and valuable to businesses of every size.
            </p>
            <div className="mt-5 space-y-5 leading-7 text-slate-300">
              <p>We recognized that many businesses face challenges in establishing their digital presence, managing daily operations, connecting systems and adapting to an increasingly technology-driven world.</p>
              <p>Our vision is to bridge that gap by providing professional development services and customized digital solutions that address real business needs.</p>
              <p>Through modern development technologies, continuous learning and a commitment to innovation, LYONDEV aims to become a trusted technology partner for businesses seeking to build, improve and scale their digital operations.</p>
              <p>Our journey is guided by the belief that every meaningful digital solution begins with understanding a problem and ends with creating something that makes a difference.</p>
            </div>
            <p className="mt-8 font-head text-sm font-bold uppercase tracking-[0.14em] text-brand">
              Build with purpose. Engineer with precision. Deliver with impact.
            </p>
          </div>
        </div>
      </section>

      <section className="about-reveal section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our purpose"
            title="A Clear Direction for Meaningful Technology."
            description="Our mission and vision shape how we approach every challenge, partnership and digital solution."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="about-card flex h-full gap-5 border-l-4 border-brand bg-card p-6 sm:p-8">
              <Target className="mt-1 h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h3 className="font-head text-2xl font-bold text-white">Our Mission</h3>
                <h4 className="mt-3 text-lg font-semibold text-white">Making Technology Work for Business Growth.</h4>
                <p className="mt-4 leading-7 text-slate-300">
                  Our mission is to design, develop and deliver innovative, reliable and user-focused digital solutions that help businesses overcome challenges, improve efficiency and achieve their objectives. We strive to combine technical excellence, creative thinking and practical business understanding to make technology useful, accessible and impactful.
                </p>
              </div>
            </article>
            <article className="about-card flex h-full gap-5 border-l-4 border-brand bg-card p-6 sm:p-8">
              <Eye className="mt-1 h-8 w-8 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h3 className="font-head text-2xl font-bold text-white">Our Vision</h3>
                <h4 className="mt-3 text-lg font-semibold text-white">Building a Smarter, More Connected Digital Future.</h4>
                <p className="mt-4 leading-7 text-slate-300">
                  Our vision is to become a trusted technology partner recognized for delivering innovative digital experiences and intelligent software solutions that empower businesses and organizations to thrive in a connected world. We aspire to contribute to a future where businesses can leverage technology to innovate, scale and create lasting value.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="about-reveal section-padding bg-ink">
        <div className="container-custom">
          <SectionHeading eyebrow="What guides us" title="The Principles Behind Everything We Build." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ title, description, Icon }) => (
              <article key={title} className="about-card min-h-56 border border-white/10 bg-card p-6">
                <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
                <h3 className="mt-5 font-head text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-reveal section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our expertise"
            title="End-to-End Digital Solutions for Modern Businesses."
            description="We bring together software engineering, digital design and technology consulting to deliver solutions that support businesses throughout their digital journey."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {EXPERTISE.map(({ title, description, href, Icon }) => (
              <article key={title} className="about-card flex min-h-60 flex-col border border-white/10 bg-card p-5 sm:p-6">
                <Icon className="h-7 w-7 text-brand" aria-hidden="true" />
                <h3 className="mt-5 font-head text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{description}</p>
                <Link
                  href={href}
                  className="mt-5 inline-flex min-h-10 items-center gap-2 border-t border-white/10 pt-3 text-sm font-semibold text-brand transition-colors hover:text-cyan"
                >
                  Explore service <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <Link
            href="/services"
            className="mt-8 inline-flex min-h-11 items-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan"
          >
            Explore all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="about-reveal section-padding bg-ink">
        <div className="container-custom">
          <SectionHeading
            eyebrow="How we work"
            title="From Understanding Your Idea to Delivering a Digital Solution."
            description="We follow a structured, collaborative development process and keep priorities, decisions and project expectations clear as work progresses."
          />
          <ol className="about-process mt-12 grid gap-7 md:grid-cols-5 md:gap-5">
            {PROCESS.map(({ title, description }, index) => (
              <li key={title} className="about-process-step relative border-l-2 border-brand/60 pl-5 md:border-l-0 md:border-t-2 md:pl-0 md:pt-7">
                <span className="absolute -left-[0.55rem] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-brand bg-ink font-mono text-xs font-bold text-brand md:left-0 md:top-[-1.05rem]">
                  0{index + 1}
                </span>
                <h3 className="font-head text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-reveal section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Technology & capabilities"
            title="Built With Modern Technologies. Designed for the Future."
            description="We use modern development tools and technologies to build responsive, maintainable and scalable digital solutions. Our technology choices are guided by project requirements, performance, security and long-term maintainability."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TECHNOLOGIES.map(({ title, items, Icon }) => (
              <article key={title} className="about-card border border-white/10 bg-card p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <h3 className="font-head text-lg font-bold text-white">{title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li key={item} className="border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs leading-5 text-slate-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-reveal section-padding bg-ink">
        <div className="container-custom grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Why LYONDEV"
              title="A Technology Partner That Understands Your Business."
              description="Choosing the right development partner is an important step in building a successful digital solution. At LYONDEV, we combine technical knowledge with a practical understanding of business needs to deliver solutions that create value."
            />
            <div className="mt-9 hidden lg:block">
              <EngineeringVisual />
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {BENEFITS.map(({ title, description }) => (
              <li key={title} className="about-card border border-white/10 bg-card p-5">
                <CheckCircle2 className="h-5 w-5 text-brand" aria-hidden="true" />
                <h3 className="mt-4 font-head text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-reveal section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Who we serve"
            title="Technology Solutions for Businesses at Every Stage."
            description="We work with different types of businesses and organizations, providing technology solutions aligned with their goals, operational requirements and growth ambitions."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map(({ title, description, Icon }) => (
              <article key={title} className="about-card flex min-h-44 gap-4 border border-white/10 bg-card p-5 sm:p-6">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-head text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-reveal section-padding bg-ink">
        <div className="container-custom grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our commitment" title="Your Goals Shape What We Build." />
            <div className="mt-6 space-y-4 leading-7 text-slate-300">
              <p>Every project begins with a conversation. We take time to understand what you want to achieve, the challenges you face and the opportunities you want to unlock.</p>
              <p>Our commitment is to approach every engagement with professionalism, transparency, technical responsibility and a focus on delivering meaningful value.</p>
              <p>We believe successful technology projects are built through collaboration, clear communication and a shared understanding of the desired outcome.</p>
            </div>
          </div>
          <ul className="grid gap-3">
            {COMMITMENT_PRINCIPLES.map(({ title, Icon }) => (
              <li key={title} className="flex items-center gap-4 border border-white/10 bg-card px-5 py-4">
                <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <span className="font-semibold text-white">{title}</span>
                <span className="ml-auto h-1 w-10 bg-brand" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-reveal section-padding border-y border-brand/40 bg-navy text-center">
        <div className="container-custom">
          <p className="eyebrow-label">Let&apos;s build the future together</p>
          <h2 className="mx-auto max-w-3xl font-head text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Have an Idea? Let&apos;s Turn It Into Something <span className="text-brand">Powerful.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl leading-7 text-slate-300">
            Whether you are starting a new business, modernizing existing operations or building your next digital product, LYONDEV is ready to help transform your vision into a practical technology solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/request-quote"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-cyan"
            >
              Start your project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={aboutWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-brand px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-black"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Talk to us on WhatsApp
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
            >
              Explore our services
            </Link>
          </div>
          <a
            href={`mailto:${LYONDEV_EMAIL}`}
            className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-brand"
          >
            <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
            {LYONDEV_EMAIL}
          </a>
        </div>
      </section>
    </main>
  );
}
