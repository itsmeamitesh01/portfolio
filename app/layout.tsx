import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amitesh Kumar Singh | Data Analyst",
  description: "Data Analyst skilled in SQL, Python, Power BI, and Google BigQuery. Delivering campaign insights, performance dashboards, and data-driven decisions.",
  keywords: ["Data Analyst", "SQL", "Python", "Power BI", "Google BigQuery", "Looker Studio"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
