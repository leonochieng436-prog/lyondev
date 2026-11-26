export type HomeFaq = {
  q: string;
  a: string;
  category?: string;
};

export const HOME_FAQ_CATEGORIES = [
  "About LYONDEV",
  "Website Development",
  "eCommerce Development",
  "Custom Software",
  "SEO and Digital Visibility",
  "Pricing and Project Process",
  "Maintenance and Support",
  "Other",
] as const;

export const HOME_FAQS: HomeFaq[] = [
  {
    q: "What is LYONDEV?",
    a: "LYONDEV is a web development and software development company based in Nairobi, Kenya. LYONDEV builds professional websites, eCommerce platforms and custom business software for organisations that need practical digital solutions.",
    category: "About LYONDEV",
  },
  {
    q: "Where is LYONDEV located?",
    a: "LYONDEV is located in Nairobi, Kenya. The team serves businesses, startups, entrepreneurs, organisations and individuals across Kenya through planned online discovery calls, content reviews and project communication.",
    category: "About LYONDEV",
  },
  {
    q: "What services does LYONDEV offer?",
    a: "LYONDEV offers business website development, eCommerce development, custom software, web applications, API integrations, website redesign, SEO-friendly development and ongoing maintenance. Service details can be reviewed on the LYONDEV services page.",
    category: "About LYONDEV",
  },
  {
    q: "Does LYONDEV serve clients outside Nairobi?",
    a: "Yes. LYONDEV serves clients across Kenya and can support projects remotely. Meetings, approvals and feedback can be handled online, while project requirements and communication are agreed at the start.",
    category: "About LYONDEV",
  },
  {
    q: "How much does it cost to develop a website in Kenya?",
    a: "The cost of website development in Kenya depends on the number of pages, design requirements, content readiness, features and integrations. A small business website and a custom web application have different scopes, so LYONDEV recommends a personalised quotation.",
    category: "Pricing and Project Process",
  },
  {
    q: "How long does it take to build a professional website?",
    a: "A professional website timeline depends on the project scope, content readiness, third-party integrations and review feedback. A clear discovery and approval process helps keep work moving; LYONDEV provides a practical schedule after requirements are understood.",
    category: "Website Development",
  },
  {
    q: "Can LYONDEV develop a website for a small business?",
    a: "Yes. LYONDEV develops business websites for small and growing organisations in Kenya. The website can include a clear services overview, contact or enquiry form, WhatsApp button and pages designed to help customers understand and choose your offer.",
    category: "Website Development",
  },
  {
    q: "Can I update my website after it has been launched?",
    a: "Yes, when suitable content management is included in the project. LYONDEV can discuss an editable website or provide updates as agreed. You can request content or feature changes through the maintenance and support process.",
    category: "Website Development",
  },
  {
    q: "Will my website work on mobile phones and tablets?",
    a: "LYONDEV plans websites with responsive layouts for mobile phones, tablets and desktop devices. Navigation, forms, images and key actions are checked across screen sizes to create a clear experience for visitors.",
    category: "Website Development",
  },
  {
    q: "Can LYONDEV redesign my existing website?",
    a: "Yes. LYONDEV can assess an existing website, identify usability or technical issues and plan a website redesign for a clearer design, better structure and improved maintainability. Existing content and systems are reviewed before replacement work is recommended.",
    category: "Website Development",
  },
  {
    q: "Do you provide website hosting and domain setup assistance?",
    a: "LYONDEV can assist with planning and setting up website hosting and domain-related requirements agreed for the project. The final provider, account ownership and ongoing costs should be confirmed before deployment.",
    category: "Website Development",
  },
  {
    q: "Can LYONDEV develop an eCommerce website in Kenya?",
    a: "Yes. LYONDEV can develop an eCommerce website with product browsing, cart or order workflows and tools for managing products and customer orders. The exact checkout, payment and delivery features are defined during project planning.",
    category: "eCommerce Development",
  },
  {
    q: "Can you integrate M-Pesa payments into an eCommerce website?",
    a: "M-Pesa integration can be considered for a suitable eCommerce workflow. The required payment method, provider access and verification process need to be confirmed during requirements planning before LYONDEV implements the integration.",
    category: "eCommerce Development",
  },
  {
    q: "Can customers place orders through WhatsApp?",
    a: "Yes, a website can include a WhatsApp enquiry or order workflow. LYONDEV can plan product links, pre-filled messages or a connected order process depending on how your sales team wants to receive and manage requests.",
    category: "eCommerce Development",
  },
  {
    q: "Can I manage products, inventory and customer orders?",
    a: "An online store can be planned with product management, inventory fields and order records for your team. The available controls, permissions and reporting tools depend on the agreed eCommerce requirements.",
    category: "eCommerce Development",
  },
  {
    q: "What is custom software development?",
    a: "Custom software development creates an application around specific business processes rather than forcing a team to rely on a generic tool. LYONDEV can plan custom software for records, workflows, approvals, reporting and integrations based on operational needs.",
    category: "Custom Software",
  },
  {
    q: "Can LYONDEV build software specifically for my business?",
    a: "Yes. LYONDEV can discuss custom business management systems, web applications and automation solutions. Discovery identifies the users, processes and data involved so the proposed software addresses the work that matters to your organisation.",
    category: "Custom Software",
  },
  {
    q: "Can you develop a POS system for my business?",
    a: "LYONDEV can develop or plan a POS system based on sales, stock and reporting requirements. The scope may include multiple users, product records, transactions, receipts and inventory integration, subject to requirements and provider availability.",
    category: "Custom Software",
  },
  {
    q: "Can you develop ERP, CRM and business management systems?",
    a: "Yes. LYONDEV can design and develop custom CRM, ERP or business management systems that fit agreed workflows. Project planning determines modules, user roles, reporting, integrations and whether existing data needs to be migrated.",
    category: "Custom Software",
  },
  {
    q: "Can custom software support multiple users and branches?",
    a: "Custom software can be designed for multiple users, roles and locations. LYONDEV can plan permissions, branch or department data, activity records and reporting according to how your organisation operates.",
    category: "Custom Software",
  },
  {
    q: "Does LYONDEV develop SEO-friendly websites?",
    a: "Yes. LYONDEV includes search-friendly technical foundations in website development where agreed, such as clear page structure, descriptive titles, crawlable content and useful internal links. SEO also requires ongoing content and business-profile work outside development alone.",
    category: "SEO and Digital Visibility",
  },
  {
    q: "Can LYONDEV help my website appear on Google?",
    a: "LYONDEV can build a technically accessible and SEO-friendly website, submit sitemap information where appropriate and improve page structure. Appearance and ranking in Google also depend on content quality, competition and search engine discovery; no result or first-page position is guaranteed.",
    category: "SEO and Digital Visibility",
  },
  {
    q: "How long does it take for a new website to appear on Google?",
    a: "There is no fixed indexing or ranking date. Search engines discover and assess websites over time, so submitting a sitemap and maintaining useful crawlable content can support discovery, but LYONDEV cannot guarantee a specific indexing date.",
    category: "SEO and Digital Visibility",
  },
  {
    q: "How do I request a website development quotation?",
    a: "You can request a quotation through the LYONDEV request-quote page, by email or on WhatsApp. Share the business goal, preferred pages or software modules, expected integrations and target timing so the project scope can be reviewed.",
    category: "Pricing and Project Process",
  },
  {
    q: "Do I need to pay before development begins?",
    a: "Project payment requirements depend on the agreed scope and terms confirmed in your quotation or project agreement. LYONDEV does not publish fixed payment percentages here; those details should be reviewed before work begins.",
    category: "Pricing and Project Process",
  },
  {
    q: "How do I get started with LYONDEV?",
    a: "Start by requesting a quotation or booking a consultation. Describe your business, the problem you want to solve and any important features or deadline constraints. LYONDEV can then discuss scope, next steps and a suitable project approach.",
    category: "Pricing and Project Process",
  },
  {
    q: "Does LYONDEV provide website maintenance?",
    a: "Yes. LYONDEV provides agreed website maintenance and technical support through suitable care arrangements. Available help may include fixes, updates, monitoring and assistance with an existing Next.js or other web application.",
    category: "Maintenance and Support",
  },
  {
    q: "Can you fix errors on an existing website?",
    a: "LYONDEV can assess existing website errors and propose maintenance work based on the cause and project scope. This may include display issues, broken features, form problems or application errors. A review and quotation can confirm the required fix.",
    category: "Maintenance and Support",
  },
  {
    q: "Can you help with website backups and recovery?",
    a: "Backup and recovery requirements can be discussed as part of website maintenance. LYONDEV can help plan backup procedures, restore processes and responsible data retention with the hosting or application provider, subject to access and agreed support.",
    category: "Maintenance and Support",
  },
  {
    q: "Can you improve website speed and performance?",
    a: "LYONDEV can review website performance and recommend practical improvements within the approved project scope. Work may include asset optimisation, layout changes or application-level adjustments, with the expected impact confirmed after testing.",
    category: "Maintenance and Support",
  },
];
