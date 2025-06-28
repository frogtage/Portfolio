import localFont from "next/font/local";

export const vazir = localFont({
  src: [
    {
      path: "../public/fonts/Vazir-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazir-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazir-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
});
