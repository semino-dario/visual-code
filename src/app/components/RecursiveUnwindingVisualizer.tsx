// components/RecursiveUnwindingVisualizer.tsx
"use client";

import React from "react";
import { useVisualizerLogic } from "../hooks/useVisualizerLogic";
import { delay } from "../utils/animation";
import ArrayElement from "./ArrayElement";
import styles from "../styles/Visualizer.module.css";

const RecursiveUnwindingVisualizer: React.FC = () => {
  const {
    inputSize,
    showVisualizer,
    isButtonDisabled,
    elements,
    handleInputChange,
    createInitialElements,
    updateElementStatus,
    updateCurrentVariable,
    triggerEndAnimation,
    resetEndAnimation,
    loopVariableRef,
    equalSignRef, // Still need ref for hiding
    arrayLengthRef, // Still need ref for hiding
    DELAY_MS,
    ACTION_DELAY_MS,
    minIterations,
    maxIterations,
  } = useVisualizerLogic({
    minIterations: 1,
    maxIterations: 10,
    initialVariableText: (size) => size, // Recursion starts from max index
    idPrefix: "recursionUnwinding",
  });

  const animateRecursiveUnwindingCall = async (
    index: number,
    elementsArray: typeof elements
  ) => {
    if (index < 0) {
      return; // Base case
    }

    updateCurrentVariable(index); // Update 'Stack Index' display
    updateElementStatus(index, "recursionUnwindingCalling"); // Highlight for calling phase
    await delay(DELAY_MS);

    // Recursive Call: Await deeper calls to finish
    await animateRecursiveUnwindingCall(index - 1, elementsArray);

    // --- Returning/Unwinding Phase (Coming Back Up the Stack) ---
    // This is where the visual "change" happens
    updateElementStatus(index, "face", "😊"); // Change to face
    await delay(ACTION_DELAY_MS);
    updateElementStatus(index, "face"); // Remove highlight, keep face
  };

  const startAnimation = async () => {
    const size =
      typeof inputSize === "number"
        ? inputSize
        : parseInt(inputSize as string, 10);

    if (isNaN(size) || size < minIterations || size > maxIterations) {
      return;
    }

    resetEndAnimation(); // Reset any previous end animation
    createInitialElements(size); // Re-initialize elements

    // Disable input and button during animation
    const inputElement = document.getElementById(
      "recursionUnwindingArraySize"
    ) as HTMLInputElement;
    const buttonElement = document.getElementById(
      "recursionUnwindingStartButton"
    ) as HTMLButtonElement;
    if (inputElement) inputElement.disabled = true;
    if (buttonElement) buttonElement.disabled = true;

    await animateRecursiveUnwindingCall(size - 1, elements); // Start from the last index

    updateCurrentVariable(minIterations - 1); // Indicate stack fully unwound (e.g., 0)
    triggerEndAnimation(); // Trigger end animation on variable

    // Re-enable input and button
    if (inputElement) inputElement.disabled = false;
    if (buttonElement) buttonElement.disabled = false;
  };

  return (
    <div className={`${styles.container} ${styles.recursionContainer}`}>
      <h1>Recursion - Unwinding Phase</h1>
      <div className={styles.controls}>
        <label htmlFor="recursionUnwindingArraySize" className={styles.label}>
          Enter array size ({minIterations}-{maxIterations}):
        </label>
        <input
          type="number"
          id="recursionUnwindingArraySize"
          min={minIterations}
          max={maxIterations}
          value={inputSize}
          onChange={handleInputChange}
          className={styles.inputNumber}
        />
        <button
          id="recursionUnwindingStartButton"
          onClick={startAnimation}
          disabled={isButtonDisabled}
          className={styles.button}
        >
          Start Animation
        </button>
      </div>

      <div
        className={`${styles.loopStatusContainer} ${
          !showVisualizer && styles.hidden
        }`}
      >
        <span className={styles.loopStatusText}>Stack Index</span>
        <span
          id="recursionUnwindingLoopVariable"
          ref={loopVariableRef}
          className={styles.loopVariable}
        >
          0
        </span>
        {/* These are hidden for recursive visualizers */}
        <span
          id="recursionUnwindingEqualSign"
          ref={equalSignRef}
          className={`${styles.equalSign} ${styles.hidden}`}
        >
          =
        </span>
        <span
          id="recursionUnwindingArrayLength"
          ref={arrayLengthRef}
          className={`${styles.arrayLength} ${styles.hidden}`}
        >
          0
        </span>
        <span className={`${styles.loopStatusText} ${styles.hidden}`}>
          length
        </span>
      </div>

      <div
        id="recursionUnwindingArrayContainer"
        className={`${styles.arrayContainer} ${
          !showVisualizer && styles.hidden
        }`}
      >
        {elements.map((el) => (
          <ArrayElement
            key={el.index}
            content={el.content}
            index={el.index}
            recursionUnwindingCalling={
              el.status === "recursionUnwindingCalling"
            }
            face={el.status === "face"}
          />
        ))}
      </div>
    </div>
  );
};

export default RecursiveUnwindingVisualizer;
