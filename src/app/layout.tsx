// app/layout.tsx
import "./styles/design-system.css";
import { ReactNode } from "react";
import { Roboto } from "next/font/google"; // Import Roboto

const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto", // Define a CSS variable for the font
  display: "swap",
});

export const metadata = {
  title: "Visualizer App",
  description: "Learn loops and recursion visually.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply the font variable directly to the html tag or a wrapper
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
