"use client";

import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import copy from "copy-to-clipboard";
import styles from "../styles/CodeExample.module.css";

interface CodeExampleProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  title?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({
  code,
  language,
  showLineNumbers = true,
  title,
}) => {
  const [copied, setCopied] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(atomDark);

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const themeAttribute = htmlElement.getAttribute("data-theme");
      setCurrentTheme(themeAttribute === "dark" ? atomDark : vs);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = () => {
    copy(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.codeContainer}>
      {title && <div className={styles.codeTitle}>{title}</div>}
      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={language}
        style={currentTheme} // Apply the dynamically selected theme
        showLineNumbers={showLineNumbers}
        wrapLines={true} // Wraps long lines
        className={styles.syntaxHighlighter} // Apply additional styles from CSS Module
        customStyle={{
          padding: "var(--spacing-md)", // Override default padding if needed
          borderRadius: "var(--border-radius-md)",
          overflowX: "auto", // Ensure horizontal scrolling for long lines
          fontSize: "var(--font-size-base)", // Use your design system font size
          // Background color is often handled by the theme itself, but you can override
          // if your theme has a different base color than desired for the container.
          backgroundColor: "transparent", // Let the container handle the background
          border: "1px solid var(--color-border-default)", // Add border from design system
        }}
        lineNumberStyle={{
          color: "var(--color-text-secondary)", // Style line numbers using design system
          opacity: 0.7,
          fontSize: "0.8em", // Slightly smaller for line numbers
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeExample;
