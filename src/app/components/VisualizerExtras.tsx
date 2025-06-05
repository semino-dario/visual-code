"use client";
import { useState } from "react";
import CodeExample from "./CodeExample";
import extraStyles from "../styles/VisualizerExtras.module.css";

export default function VisualizerExtras() {
  const [activeCode, setActiveCode] = useState(false);
  const [activeText, setActiveText] = useState(false);

  const code = `
  for (let i = 0; i < 10; i++) { 
     console.log(i); }
  
  // Example of a while loop 
  
  while (condition) { 
    console.log("Looping..."); }
  `;

  return (
    <div>
      <div
        className={extraStyles.buttonContent}
        onClick={() => setActiveCode(!activeCode)}
      >
        {!activeCode ? "Code example" : "Close code"}
      </div>
      {activeCode && <CodeExample code={code} language="javascript" />}

      <div
        className={extraStyles.buttonContent}
        onClick={() => setActiveText(!activeText)}
      >
        {!activeText ? "See explanation" : "Close"}
      </div>
      {activeText && (
        <div>
          <p>
            This section provides additional code examples and explanations for
            the visualizer. Click the button above to toggle the code view.
          </p>
        </div>
      )}
    </div>
  );
}
