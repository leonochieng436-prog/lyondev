"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";

type NavItem = { label: string; href: string };
type NamedLink = { title: string; slug: string };

const mainLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNavControls({
  services,
  solutions,
}: {
  services: NamedLink[];
  solutions: { name: string; slug: string }[];
}) {
  const [openMenu, setOpenMenu] = useState<"services" | "solutions" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const pages = [
    ...mainLinks,
    { label: "Services", href: "/services" },
    ...services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
    { label: "Solutions", href: "/solutions" },
    ...solutions.map((solution) => ({
      label: solution.name,
      href: `/solutions/${solution.slug}`,
    })),
  ];
  const matches = pages.filter((page) => page.label.toLowerCase().includes(query.trim().toLowerCase()));

  const Dropdown = ({
    id,
    title,
    links,
  }: {
    id: "services" | "solutions";
    title: string;
    links: NavItem[];
  }) => (
    <div className="relative">
      <button
        type="button"
        aria-expanded={openMenu === id}
        aria-controls={`${id}-menu`}
        onClick={() => setOpenMenu(openMenu === id ? null : id)}
        className={`inline-flex items-center gap-1 border-b-2 py-2 text-sm transition-colors hover:border-brand hover:text-brand ${
          pathname.startsWith(id === "services" ? "/services" : "/solutions")
            ? "border-brand text-brand"
            : "border-transparent text-slate-200"
        }`}
      >
        {title} <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
      {openMenu === id && (
        <div
          id={`${id}-menu`}
          className="absolute left-0 top-full z-50 mt-2 max-h-80 w-64 overflow-auto border border-white/10 bg-card p-2"
        >
          <Link
            href={id === "services" ? "/services" : "/solutions"}
            onClick={() => setOpenMenu(null)}
            className="block px-3 py-2 text-sm font-semibold text-cyan hover:bg-white/5"
          >
            View all {title.toLowerCase()}
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenMenu(null)}
              className="block px-3 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden items-center gap-5 lg:flex">
        <Link
          href="/about"
          aria-current={pathname === "/about" ? "page" : undefined}
          className={`border-b-2 py-2 text-sm transition-colors hover:border-brand hover:text-brand ${
        pathname === "/about" ? "border-brand text-brand" : "border-transparent text-slate-200"
          }`}
        >
          About
        </Link>
        <Dropdown
          id="services"
          title="Services"
          links={services.map((service) => ({ label: service.title, href: `/services/${service.slug}` }))}
        />
        <Dropdown
          id="solutions"
          title="Solutions"
          links={solutions.map((solution) => ({ label: solution.name, href: `/solutions/${solution.slug}` }))}
        />
        {mainLinks.slice(1).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className={`border-b-2 py-2 text-sm transition-colors hover:border-brand hover:text-brand ${
              pathname === link.href ? "border-brand text-brand" : "border-transparent text-slate-200"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          type="button"
          aria-label="Search the site"
          onClick={() => setSearchOpen(true)}
          className="p-2 text-slate-200 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center gap-3 lg:hidden">
        <Link
          href="/contact"
          className="inline-flex min-h-9 items-center border border-brand px-3 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-black sm:hidden"
        >
          Contact us
        </Link>
        <button
          type="button"
          aria-label="Search the site"
          onClick={() => setSearchOpen(true)}
          className="p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-ink py-4 lg:hidden">
          <nav aria-label="Mobile navigation" className="container-custom grid grid-cols-2 gap-x-4 gap-y-1">
            {[...mainLinks.slice(0, 1), { label: "Services", href: "/services" }, { label: "Solutions", href: "/solutions" }, ...mainLinks.slice(1), { label: "Get a quote", href: "/request-quote" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`border-l-2 py-2 pl-2 text-sm text-slate-100 hover:text-brand ${
                  pathname === link.href ? "border-brand text-brand" : "border-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="container-custom mt-3 grid grid-cols-2 gap-x-4 border-t border-white/10 pt-3">
            {[...services.map((service) => ({ label: service.title, href: `/services/${service.slug}` })), ...solutions.map((solution) => ({ label: solution.name, href: `/solutions/${solution.slug}` }))].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-xs text-slate-400 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/contact"
        className="hidden min-h-11 items-center border border-brand px-4 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-black sm:inline-flex"
      >
        Contact Us
      </Link>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-overlay/85 px-5 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            className="w-full max-w-2xl border border-white/15 bg-card p-5 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 id="site-search-title" className="font-head text-xl font-bold text-white">Search LyonDev</h2>
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <label className="sr-only" htmlFor="site-search-input">Search pages</label>
            <input
              id="site-search-input"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pages and services"
              className="mt-5 w-full border border-white/15 bg-navy px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
            />
            <ul className="mt-4 max-h-[50vh] overflow-auto">
              {matches.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={() => setSearchOpen(false)}
                    className="block border-b border-white/10 px-2 py-3 text-sm text-slate-200 hover:bg-white/5 hover:text-white"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
              {matches.length === 0 && (
                <li className="px-2 py-4 text-sm text-slate-300">No matching pages found.</li>
              )}
            </ul>
          </section>
        </div>
      )}
    </>
  );
}
