import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StuddClub — Admin Portal & Profile Management",
  description: "Executive control panel to add, upload, edit and manage verified VIP profiles across India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0F0D0C] text-[#F8F5F0] min-h-screen">
        {children}
      </body>
    </html>
  );
}
