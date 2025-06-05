// app/layout.tsx
import "./styles/design-system.css";
import { Roboto, Fira_Code } from "next/font/google";
import ThemeSetter from "./components/ThemeSetter";

const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto", // Define a CSS variable for the font
  display: "swap",
});

const firaCode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fira-code", // Use a separate variable for mono font
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
    <html
      lang="en"
      className={`${roboto.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeSetter />
        {children}
      </body>
    </html>
  );
}
