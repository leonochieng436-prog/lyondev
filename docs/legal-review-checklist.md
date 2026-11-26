# LYONDEV Legal and Privacy Review Checklist

Internal working checklist. All items are deliberately unchecked. The public legal pages are drafts and must not be presented as approved policies until LYONDEV and a Kenyan advocate complete this review.

## Business identity and accountability

- [ ] Confirm the legal name of the contracting person or entity and the business/trading name LYONDEV.
- [ ] Confirm registration, tax, and other business details that must be disclosed; do not publish unverified details.
- [ ] Confirm the official contact email, phone/WhatsApp, any publishable physical address, and privacy-request contact.
- [ ] Determine whether LYONDEV acts as controller, processor, or both for each service and client engagement.
- [ ] Assess whether registration with the ODPC is required, including any applicable activity, size, or exemption criteria. Do not claim registration or exemption until verified.

## Kenyan legal review

- [ ] Have a Kenyan advocate verify current texts, amendments, applicability, and all statements in the draft policies.
- [ ] Review the Data Protection Act, 2019 and the Data Protection (General), (Registration of Data Controllers and Data Processors), and (Complaints Handling and Enforcement) Regulations, 2021.
- [ ] Assess relevant consumer-facing obligations, including the Consumer Protection Act, before finalizing pricing, cancellation, refund, warranties, and online contracting language.
- [ ] Review copyright and other intellectual-property wording against the Copyright Act and applicable licences.
- [ ] Review acceptable-use, security, and incident language against the Computer Misuse and Cybercrimes Act and other applicable law.
- [ ] Confirm the required privacy-request identity checks, response steps, exceptions, and statutory time limits; do not promise a deadline until confirmed.
- [ ] Assess whether a data-protection impact assessment, regulator notification, or other formal process is required for actual processing.

## Data, providers, and security

- [ ] Map every public and admin form to the actual database fields, purposes, recipients, and retention rule.
- [ ] Confirm database, hosting, backup, email, media, domain, and support providers, including their processing locations and subprocessors.
- [ ] Confirm whether Resend and Cloudinary are enabled in production and document the data each receives.
- [ ] Confirm the configured Google Analytics property, settings, retention, and any associated cookies or identifiers.
- [ ] Verify Google Maps behavior and the consent gate on the deployed website.
- [ ] Document WhatsApp and other user-directed third-party links and the point at which the third party receives information.
- [ ] Assess international transfers and put appropriate contractual and legal safeguards in place where required.
- [ ] Set a retention and deletion schedule for inquiries, consultations, newsletter records, privacy requests, audit records, and backups.
- [ ] Review access controls, administrator accounts, password reset and session handling, audit access, backup protection, incident response, and deletion procedures.
- [ ] Verify how privacy requests are identity-checked, assigned, answered, escalated, recorded, and securely closed.
- [ ] Review whether existing newsletter subscribers have valid affirmative consent. Existing rows without `consentAt` and `consentVersion` contain no consent record and must not be treated as opted in.
- [ ] Confirm the privacy notices shown beside contact, quote, consultation, quick-request, newsletter, and privacy-request forms.

## Commercial, intellectual-property, and publication review

- [ ] Confirm the pricing-page statements: 50% deposit / 50% before handover, 14-day quote validity, separate scope-change and third-party costs, and 30-day in-scope bug-fix warranty.
- [ ] Approve project-specific payment, cancellation, refund, warranty, support, hosting, suspension, and dispute terms without adding unapproved blanket fees or no-refund terms.
- [ ] Confirm ownership/licensing, source-code delivery, open-source and third-party components, client materials, and portfolio-use permissions in written project agreements.
- [ ] Verify all client names, portfolio materials, testimonials, and case-study permissions before publication.
- [ ] Confirm whether any minors or sensitive personal information could be collected and whether additional safeguards are needed.
- [ ] Check that no legal entity name, street address, registration/tax number, ODPC status, certification, or compliance claim is published without verification.
- [ ] Have a Kenyan advocate approve every legal page and the privacy-request process; record reviewer, approval date, and effective date.
- [ ] Re-run the production cookie/script inventory after every analytics, marketing, map, or other third-party integration change.

## Implementation checks

- [ ] Apply the new database migration and regenerate Prisma Client in the deployment workflow.
- [ ] Test accept-all, reject-optional, customize, persistence, version-change re-consent, and withdrawal in supported browsers.
- [ ] Verify no analytics request or map iframe loads before the relevant optional choice.
- [ ] Verify privacy requests are rate limited, validated, stored privately, available to ADMIN only, and status changes are audited.
- [ ] Verify newsletter consent timestamp/version is stored and that an unsubscribe/contact process is operational before any newsletter is sent.
- [ ] Test all legal routes, links, sitemap entries, mobile layout, and accessible keyboard operation.
