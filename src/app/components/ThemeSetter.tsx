"use client";

import { useEffect } from "react";

const ThemeSetter: React.FC = () => {
  useEffect(() => {
    // This logic ensures the theme is set on the <html> element
    // once the component mounts on the client-side.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []); // Run only once on initial client mount

  return null; // This component doesn't render any visual UI
};

export default ThemeSetter;
