// components/RecursiveCallingVisualizer.tsx
"use client";

import React from "react";
import { useVisualizerLogic } from "../hooks/useVisualizerLogic";
import { delay } from "../utils/animation";
import ArrayElement from "./ArrayElement";
import styles from "../styles/Visualizer.module.css";

const RecursiveCallingVisualizer: React.FC = () => {
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
    HIGHLIGHT_REMOVE_DELAY_MS,
    minIterations,
    maxIterations,
  } = useVisualizerLogic({
    minIterations: 1,
    maxIterations: 10,
    initialVariableText: (size) => size - 1, // Calling phase starts from max index (N-1)
    idPrefix: "recursionCalling",
  });

  const animateRecursiveCallingCall = async (
    index: number,
    elementsArray: typeof elements
  ) => {
    if (index < 0) {
      // Base case: index goes below 0
      return;
    }

    updateCurrentVariable(index); // Update 'Stack Index' display
    const currentElement = elementsArray[index];

    updateElementStatus(index, "recursionCallingActive"); // Highlight as call is active
    await delay(DELAY_MS);

    updateElementStatus(index, "face", "😊"); // Action happens IMMEDIATELY (on call)
    await delay(ACTION_DELAY_MS);

    // Recursive Call (to the next element, which is index - 1 for descending)
    await animateRecursiveCallingCall(index - 1, elementsArray);

    // Remove highlight AFTER the recursive call returns (unwinds its highlight)
    updateElementStatus(index, "face"); // Ensure status is still 'face' after highlight removal
    await delay(HIGHLIGHT_REMOVE_DELAY_MS);
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
      "recursionCallingArraySize"
    ) as HTMLInputElement;
    const buttonElement = document.getElementById(
      "recursionCallingStartButton"
    ) as HTMLButtonElement;
    if (inputElement) inputElement.disabled = true;
    if (buttonElement) buttonElement.disabled = true;

    await animateRecursiveCallingCall(size - 1, elements); // Start from the last index (size - 1)

    updateCurrentVariable(minIterations - 1); // All elements processed, index below 0 (e.g., -1 or 0)
    triggerEndAnimation(); // Trigger end animation on variable

    // Re-enable input and button
    if (inputElement) inputElement.disabled = false;
    if (buttonElement) buttonElement.disabled = false;
  };

  return (
    <div className={`${styles.container} ${styles.recursionCallingContainer}`}>
      <h1>Recursion - Calling Phase</h1>
      <div className={styles.controls}>
        <label htmlFor="recursionCallingArraySize" className={styles.label}>
          Enter array size ({minIterations}-{maxIterations}):
        </label>
        <input
          type="number"
          id="recursionCallingArraySize"
          min={minIterations}
          max={maxIterations}
          value={inputSize}
          onChange={handleInputChange}
          className={styles.inputNumber}
        />
        <button
          id="recursionCallingStartButton"
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
          id="recursionCallingLoopVariable"
          ref={loopVariableRef}
          className={styles.loopVariable}
        >
          0
        </span>
        {/* These are hidden for recursive visualizers */}
        <span
          id="recursionCallingEqualSign"
          ref={equalSignRef}
          className={`${styles.equalSign} ${styles.hidden}`}
        >
          =
        </span>
        <span
          id="recursionCallingArrayLength"
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
        id="recursionCallingArrayContainer"
        className={`${styles.arrayContainer} ${
          !showVisualizer && styles.hidden
        }`}
      >
        {elements.map((el) => (
          <ArrayElement
            key={el.index}
            content={el.content}
            index={el.index}
            recursionCallingActive={el.status === "recursionCallingActive"}
            face={el.status === "face"}
          />
        ))}
      </div>
    </div>
  );
};

export default RecursiveCallingVisualizer;
