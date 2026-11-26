import { PrismaClient, PricingGroup as G } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();
type P = [G, string, number, number | null, boolean, string, boolean, string[]];
const pk: P[] = [
  ["WEBSITE", "Starter Website", 15000, null, false, "one-time", false, ["Up to 5 pages", "Responsive design", "WhatsApp integration", "Contact form", "Basic SEO setup"]],
  ["WEBSITE", "Professional Website", 35000, null, false, "one-time", true, ["Up to 10 pages", "Custom UI/UX design", "SEO optimization", "Google Maps", "Analytics and Search Console setup", "Blog or news section"]],
  ["WEBSITE", "Business Enterprise Website", 65000, 120000, false, "one-time", false, ["Custom architecture", "Dynamic content management", "Advanced SEO", "Lead management", "Training and handover"]],
  ["ECOMMERCE", "Basic Online Store", 45000, null, false, "one-time", false, ["Product catalogue", "Cart and checkout", "WhatsApp ordering"]],
  ["ECOMMERCE", "Professional eCommerce", 80000, null, false, "one-time", true, ["M-Pesa integration", "Order and inventory management", "Customer accounts"]],
  ["ECOMMERCE", "Advanced eCommerce", 120000, 200000, false, "one-time", false, ["Discounts", "Delivery management", "Sales reports"]],
  ["ECOMMERCE", "Marketplace Platform", 200000, 500000, true, "one-time", false, ["Multi-vendor", "Admin dashboard"]],
  ["MOBILE", "Basic Android", 80000, null, false, "one-time", false, []], ["MOBILE", "Advanced Android", 150000, null, false, "one-time", false, []],
  ["MOBILE", "iOS Application", 150000, null, false, "one-time", false, []], ["MOBILE", "Cross-platform Application", 180000, null, false, "one-time", false, []],
  ["MOBILE", "Application with Backend/API", 200000, null, true, "one-time", false, []],
  ["CARE", "Basic Care", 2500, null, false, "/month", false, ["Basic website updates", "Uptime monitoring", "Monthly backup checks", "Basic technical support"]],
  ["CARE", "Professional Care", 5000, null, false, "/month", true, ["Everything in Basic", "Security and dependency updates", "Minor content updates", "Priority support"]],
  ["CARE", "Enterprise Care", 10000, 25000, false, "/month", false, ["Everything in Professional", "Advanced monitoring", "Agreed development hours"]],
];
const software: [string, number][] = [["POS System", 60000], ["Inventory Management", 65000], ["School Management", 100000], ["Hospital/Clinic Management", 150000], ["HR & Payroll", 100000], ["CRM System", 90000], ["ERP System", 200000], ["Booking Management", 65000], ["Property/Rental Management", 100000], ["Business Automation", 75000], ["Enterprise Software", 300000]];
const svc: [string, string, string][] = [["website-development", "Website Design & Development", "Business, ecommerce, school and institutional websites."], ["ecommerce-development", "eCommerce Website Development", "Online stores with secure checkout, payments and order management."], ["custom-software", "Custom Software Development", "POS, ERP, CRM, school and clinic systems."], ["mobile-app-development", "Mobile Application Development", "Android, iOS and progressive web apps."], ["ui-ux-design", "UI/UX Design", "Interfaces, prototypes and design systems."], ["api-development", "API Development & System Integration", "Secure APIs and integrations that connect your business systems."], ["ai-automation", "AI & Business Automation", "Chatbots, M-Pesa Daraja and workflow automation."], ["cybersecurity", "Cybersecurity & IT Solutions", "Authorized security assessments and backup planning."], ["digital-marketing", "SEO & Digital Marketing", "SEO, Google Business Profile and analytics."], ["cloud-infrastructure", "Cloud Solutions & Technical Support", "Deployment, databases, email and backups."]];
async function main() {
  const email = process.env.SEED_ADMIN_EMAIL!;
  await db.adminUser.upsert({ where: { email }, update: {}, create: { email, name: "Administrator", role: "ADMIN", passwordHash: await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD!, 12) } });
  if ((await db.pricingPackage.count()) === 0) {
    for (const [i, [group, name, f, t, sf, unit, rec, feats]] of pk.entries())
      await db.pricingPackage.create({ data: { group, name, priceFromKes: f, priceToKes: t, startingFrom: sf, unit, recommended: rec, sortOrder: i, features: { create: feats.map((text) => ({ text })) } } });
    for (const [i, [name, f]] of software.entries()) await db.pricingPackage.create({ data: { group: "SOFTWARE", name, priceFromKes: f, startingFrom: true, sortOrder: 100 + i } });
  }
  for (const [i, [slug, title, summary]] of svc.entries()) await db.service.upsert({ where: { slug }, update: {}, create: { slug, title, summary, sortOrder: i } });
}
async function extra() {
  const ind: [string, string, string][] = [["Retail", "retail", "POS, inventory and eCommerce for shops and wholesalers."], ["Education", "education", "School management, portals and fee tracking."], ["Healthcare", "healthcare", "Clinic and hospital management systems."], ["Real Estate", "real-estate", "Property, tenant and rental management."], ["Hospitality", "hospitality", "Booking, front desk and restaurant systems."], ["Logistics", "logistics", "Fleet, dispatch and distribution tracking."]];
  for (const [name, slug, summary] of ind) await db.industry.upsert({ where: { slug }, update: {}, create: { name, slug, summary } });
  const set: Record<string, unknown> = { companyName: "LYONDEV", tagline: "Technology. Innovation. Growth.", aboutSummary: "LYONDEV is a software development and digital transformation partner helping businesses modernize operations, automate workflows and build a strong digital presence.", vision: "", mission: "", values: "", email: "", phone: "", whatsapp: "", address: "", hours: "", facebook: "", twitter: "", linkedin: "", gaId: "",
    faq: [
      { q: "How long does it take to build a professional website?", a: "A professional website timeline depends on the project scope, content readiness, third-party integrations and review feedback. LYONDEV provides a practical schedule after requirements are understood.", category: "Website Development" },
      { q: "Can you integrate M-Pesa payments into an eCommerce website?", a: "M-Pesa integration can be considered for a suitable eCommerce workflow. The required payment method, provider access and verification process need to be confirmed during requirements planning.", category: "eCommerce Development" },
      { q: "Does LYONDEV provide website maintenance?", a: "LYONDEV provides agreed website maintenance and technical support through suitable care arrangements. Available help may include fixes, updates, monitoring and assistance with an existing web application.", category: "Maintenance and Support" }
    ] };
  for (const [key, value] of Object.entries(set)) await db.siteSetting.upsert({ where: { key }, update: {}, create: { key, value: value as never } });
  if ((await db.pricingAddon.count()) === 0) await db.pricingAddon.createMany({ data: [["Logo design", 3500, 8000], ["Business email setup", 2500, 5000], ["Google Business Profile setup", 5000, 10000], ["Basic SEO (monthly)", 8000, 15000], ["M-Pesa Daraja integration", 15000, 40000], ["API integration", 10000, 40000], ["Website speed optimization", 5000, 15000]].map(([name, a, b], i) => ({ name: name as string, priceFromKes: a as number, priceToKes: b as number, sortOrder: i })) });
  if ((await db.consultationAvailability.count()) === 0) await db.consultationAvailability.createMany({ data: [1, 2, 3, 4, 5].map((weekday) => ({ weekday, startMinute: 540, endMinute: 1020 })) });
  if ((await db.portfolioProject.count()) === 0) await db.portfolioProject.create({ data: { slug: "demo-retail-pos", name: "Demo: Retail POS", summary: "A clearly labelled demonstration project. Replace with a real project in the admin.", category: "Business systems", technologies: ["Next.js", "PostgreSQL"], demo: true, featured: true, status: "PUBLISHED" } });
}
main().then(extra).finally(() => db.$disconnect());
