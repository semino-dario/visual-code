// components/ThemeToggleButton.tsx
"use client"; // This component must be a client component because it interacts with the DOM and localStorage

import React, { useState, useEffect } from "react";
import styles from "../styles/GlobalStyles.module.css"; // Assuming button styles are here

const ThemeToggleButton: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Effect to read initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (savedTheme === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []); // Empty dependency array means this runs once on initial client mount

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Apply theme to HTML element
    localStorage.setItem("theme", newTheme); // Save preference
  };

  return (
    <button
      className={styles.button} // Using the button style from Visualizer.module.css
      onClick={toggleTheme}
      // Add a margin to position it nicely, or let parent handle positioning
      style={{ marginBottom: "var(--spacing-lg)" }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggleButton;
