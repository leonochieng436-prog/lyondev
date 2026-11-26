export const kes = (n: number) => "KES " + n.toLocaleString("en-KE");
export const priceText = (p: { priceFromKes: number; priceToKes: number | null; startingFrom: boolean; unit: string }) =>
  (p.startingFrom ? "From " : "") + kes(p.priceFromKes) + (p.priceToKes ? ` – ${p.priceToKes.toLocaleString("en-KE")}` : p.priceFromKes && !p.startingFrom ? "" : "") + (p.unit === "one-time" ? "" : ` ${p.unit}`);
