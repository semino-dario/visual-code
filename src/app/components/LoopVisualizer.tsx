"use client";

import React from "react";
import { useVisualizerLogic } from "../hooks/useVisualizerLogic";
import { delay } from "../utils/animation";
import ArrayElement from "./ArrayElement";
import styles from "../styles/GlobalStyles.module.css";
import VisualizerContainer from "./VisualizerContainer";
import VisualizerExtras from "./VisualizerExtras";

const LoopVisualizer: React.FC = () => {
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
    equalSignRef,
    arrayLengthRef,
    DELAY_MS,
    ACTION_DELAY_MS,
    minIterations,
    maxIterations,
  } = useVisualizerLogic({
    minIterations: 1,
    maxIterations: 10,
    initialVariableText: () => 0, // Loop starts at 0
    idPrefix: "loop",
  });

  const startAnimation = async () => {
    const size =
      typeof inputSize === "number"
        ? inputSize
        : parseInt(inputSize as string, 10);

    // Final safeguard before starting animation
    if (isNaN(size) || size < minIterations || size > maxIterations) {
      // This case should ideally be prevented by button.disabled
      return;
    }

    resetEndAnimation(); // Reset any previous end animation
    createInitialElements(size); // Re-initialize elements to their starting state

    // Disable input and button during animation
    const inputElement = document.getElementById(
      "arraySize"
    ) as HTMLInputElement;
    const buttonElement = document.getElementById(
      "startButton"
    ) as HTMLButtonElement;
    if (inputElement) inputElement.disabled = true;
    if (buttonElement) buttonElement.disabled = true;

    for (let i = 0; i < elements.length; i++) {
      updateCurrentVariable(i); // Update 'Variable' display
      updateElementStatus(i, "highlight"); // Highlight current element
      await delay(DELAY_MS);

      updateElementStatus(i, "face", "😊"); // Change to face
      await delay(ACTION_DELAY_MS);
      updateElementStatus(i, "face"); // Remove highlight, keep face
    }

    updateCurrentVariable(elements.length); // Set final variable value
    triggerEndAnimation(); // Trigger end animation on equal sign

    // Re-enable input and button
    if (inputElement) inputElement.disabled = false;
    if (buttonElement) buttonElement.disabled = false;
  };

  return (
    <div>
      <VisualizerContainer title={"Loop Visualizer"}>
        <div className={styles.controls}>
          <label htmlFor="arraySize" className={styles.label}>
            Enter array size ({minIterations}-{maxIterations}):
          </label>
          <input
            type="number"
            id="arraySize"
            min={minIterations}
            max={maxIterations}
            value={inputSize}
            onChange={handleInputChange}
            className={styles.inputNumber}
          />
          <button
            id="startButton"
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
          <span className={styles.loopStatusText}>Variable</span>
          <span
            id="loopVariable"
            ref={loopVariableRef}
            className={styles.loopVariable}
          >
            0
          </span>
          <span id="equalSign" ref={equalSignRef} className={styles.equalSign}>
            =
          </span>
          <span
            id="arrayLength"
            ref={arrayLengthRef}
            className={styles.arrayLength}
          >
            0
          </span>
          <span className={styles.loopStatusText}>length</span>
        </div>

        <div
          id="arrayContainer"
          className={`${styles.arrayContainer} ${
            !showVisualizer && styles.hidden
          }`}
        >
          {elements.map((el) => (
            <ArrayElement
              key={el.index}
              content={el.content}
              index={el.index}
              highlight={el.status === "highlight"}
              face={el.status === "face"}
            />
          ))}
        </div>
      </VisualizerContainer>
      <VisualizerExtras />
    </div>
  );
};

export default LoopVisualizer;
