"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Visualizer.module.css"; // Import the module CSS for component styles

const DesignSystemShowcase: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={styles.mainContentWrapper}>
      <div
        className={styles.container}
        style={{ marginBottom: "var(--spacing-xxl)" }}
      >
        <h2>Design System Showcase</h2>
        <button
          className={styles.button}
          onClick={toggleTheme}
          style={{ marginBottom: "var(--spacing-lg)" }}
        >
          Toggle Theme: {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* --- Color Palette --- */}
        <h3>Colors</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "var(--spacing-md)",
            width: "100%",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          {[
            { name: "Primary Accent", var: "--color-primary-accent" },
            { name: "Text Default", var: "--color-text-default" },
            { name: "Text Secondary", var: "--color-text-secondary" },
            { name: "Text Inverse", var: "--color-text-inverse" },
            { name: "Background Body", var: "--color-background-body" },
            {
              name: "Background Container",
              var: "--color-background-container",
            },
            { name: "Border Default", var: "--color-border-default" },
            { name: "Shadow Light", var: "--color-shadow-light" },
            {
              name: "Validation Error (Alert)",
              var: "--color-validation-error",
            }, // Updated name
            { name: "Highlight Loop (#F9C22E)", var: "--color-highlight-loop" }, // Added hex for clarity
            {
              name: "Highlight Unwinding",
              var: "--color-highlight-recursion-unwinding-call",
            },
            {
              name: "Highlight Calling (#F15946)",
              var: "--color-highlight-recursion-calling-active",
            }, // Added hex for clarity
            { name: "Element Completed", var: "--color-element-completed" },
            { name: "Element Default Bg", var: "--color-element-default-bg" },
            {
              name: "Element Default Border",
              var: "--color-element-default-border",
            },
          ].map((color) => (
            <div
              key={color.name}
              style={{
                backgroundColor: `var(${color.var})`,
                border: `1px solid var(--color-border-default)`,
                borderRadius: "var(--border-radius-sm)",
                padding: "var(--spacing-sm)",
                height: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                fontSize: "var(--font-size-small)",
                // Adjust text color on swatches for readability, especially for light colors
                color:
                  color.name.includes("Text") ||
                  color.name.includes("Inverse") ||
                  color.name.includes("Background") ||
                  color.name.includes("Shadow")
                    ? "inherit"
                    : theme === "light"
                    ? color.name.includes("Primary Accent") ||
                      color.name.includes("Highlight")
                      ? "var(--color-text-inverse)"
                      : "var(--color-text-default)"
                    : color.name.includes("Primary Accent") ||
                      color.name.includes("Highlight")
                    ? "var(--color-text-default)"
                    : "var(--color-text-inverse)",
                boxShadow: "var(--color-shadow-light)",
                transition:
                  "background-color var(--transition-duration-normal) var(--transition-ease), color var(--transition-duration-normal) var(--transition-ease)",
              }}
            >
              <span
                style={{
                  backgroundColor:
                    theme === "light"
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(0,0,0,0.7)",
                  padding: "2px 4px",
                  borderRadius: "var(--border-radius-sm)",
                  color: "inherit", // Inherit color from parent div
                }}
              >
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* --- Typography --- */}
        <h3>Typography</h3>
        <div
          style={{
            textAlign: "left",
            width: "100%",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          <h1>Heading 1 - (H1 Title)</h1>
          <h2>Heading 2 - (H2 Subtitle)</h2>
          <h3>Heading 3 - (H3 Section Title)</h3>
          <p>
            This is a paragraph of base text. It uses `var(--font-size-base)`
            and `var(--line-height-base)`. The font family is
            `var(--font-family-base)`.
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            This is secondary text, good for captions or less prominent
            information.
          </p>
          <small>This is small text, using `var(--font-size-small)`.</small>
        </div>

        {/* --- Spacing --- */}
        <h3>Spacing</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--spacing-sm)",
            width: "100%",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          {[
            { name: "xs (4px)", size: "var(--spacing-xs)" },
            { name: "sm (8px)", size: "var(--spacing-sm)" },
            { name: "md (16px)", size: "var(--spacing-md)" },
            { name: "lg (24px)", size: "var(--spacing-lg)" },
            { name: "xl (32px)", size: "var(--spacing-xl)" },
            { name: "xxl (48px)", size: "var(--spacing-xxl)" },
          ].map((space) => (
            <div
              key={space.name}
              style={{
                width: space.size,
                height: space.size,
                backgroundColor: "var(--color-primary-accent)",
                borderRadius: "var(--border-radius-sm)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--color-text-inverse)",
                fontSize: "var(--font-size-small)",
                fontWeight: "var(--font-weight-medium)",
                boxShadow: "var(--color-shadow-light)",
                transition:
                  "background-color var(--transition-duration-normal) var(--transition-ease)",
              }}
            >
              {space.name}
            </div>
          ))}
        </div>

        {/* --- Component Examples --- */}
        <h3>Component Examples</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-lg)",
            width: "100%",
            alignItems: "center",
          }}
        >
          <button className={styles.button}>Primary Button</button>
          <button className={styles.button} disabled>
            Disabled Button
          </button>
          <input
            type="number"
            placeholder="Number Input"
            className={styles.inputNumber}
            style={{ width: "150px" }}
          />
          <div
            className={styles.arrayElement}
            style={{ width: "100px", height: "100px" }}
          >
            <span className={styles.arrayElementContent}>12</span>
            <span className={styles.arrayIndex}>Index [5]</span>
          </div>
          <div
            className={`${styles.arrayElement} ${styles.face}`}
            style={{ width: "100px", height: "100px" }}
          >
            <span className={styles.arrayElementContent}>😊</span>
            <span className={styles.arrayIndex}>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;
