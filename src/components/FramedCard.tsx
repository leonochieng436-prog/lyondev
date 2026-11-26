export default function FramedCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="contact-form-title"
      className="frame-corners-four relative border border-white/10 bg-card/95 px-5 pb-6 pt-10 sm:px-8 sm:pb-8"
    >
      <h2
        id="contact-form-title"
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-card px-4 font-head text-lg font-semibold text-white"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
