export default function ContactInfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="contact-info-block border-l-2 border-brand py-1 pl-5">
      <h2 className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </h2>
      <div className="text-base leading-7 text-white">{children}</div>
    </section>
  );
}
