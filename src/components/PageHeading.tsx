export default function PageHeading({ title }: { title: string }) {
  return (
    <h1 aria-label={`${title}.`} className="contact-page-heading mb-10 font-head font-extrabold text-white sm:mb-12">
      {title}
      <span className="ml-2 inline-block h-3 w-3 translate-y-[-0.2em] bg-cyan" aria-hidden="true" />
    </h1>
  );
}
