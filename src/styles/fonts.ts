import labradaRegular from "next/font/local";

// For self-hosted (local) fonts
export const customLocalFont = labradaRegular({
  src: "@/public/fonts/Labrada-Regular.woff2",
  display: "swap",
  variable: "--font-labrada-regular",
});
