import Header from "@/components/Header";
import { Providers } from "./providers";
import "./globals.css";
import { vazir } from "@/lib/fonts";

export const metadata = {
  title: "Dokhaei",
  description: "Created By Mo Dokhaei",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${vazir.className}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
