// components/ArrayElement.tsx
import React from "react";
import styles from "../styles/GlobalStyles.module.css";

interface ArrayElementProps {
  content: string | number;
  index: number;
  highlight?: boolean; // For loop visualizer
  recursionUnwindingCalling?: boolean; // For unwinding phase recursion visualizer
  recursionCallingActive?: boolean; // For calling phase recursion visualizer
  face?: boolean;
}

const ArrayElement: React.FC<ArrayElementProps> = ({
  content,
  index,
  highlight,
  recursionUnwindingCalling,
  recursionCallingActive,
  face,
}) => {
  const elementClasses = [
    styles.arrayElement,
    highlight && styles.highlight,
    recursionUnwindingCalling && styles.recursionElementCalling,
    recursionCallingActive && styles.recursionCallingElementActive,
    face && styles.face,
  ]
    .filter(Boolean)
    .join(" "); // Filter out false/undefined values and join

  return (
    <div className={elementClasses} data-index={index}>
      <span className={styles.arrayElementContent}>{content}</span>
      <span className={styles.arrayIndex}>index: [{index}]</span>
    </div>
  );
};

export default ArrayElement;
