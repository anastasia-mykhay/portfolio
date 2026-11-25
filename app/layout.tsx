import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anastasiya M. — UI/UX designer",
  description: "I design AI-assisted interfaces. Portfolio of Anastasiya M.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

