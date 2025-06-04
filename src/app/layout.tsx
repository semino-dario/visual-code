// app/layout.tsx
import "./styles/design-system.css";
import { Roboto } from "next/font/google"; // Import Roboto
import ThemeSetter from "./components/ThemeSetter";

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
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <body>
        <ThemeSetter />
        {children}
      </body>
    </html>
  );
}
