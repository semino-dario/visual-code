import { useState, useEffect, useCallback, useRef } from "react";

interface VisualizerState {
  inputSize: string;
  validationMessage: string;
  showVisualizer: boolean;
  isButtonDisabled: boolean;
  currentVariable: number;
  arrayLength: number;
  elements: {
    content: string | number;
    index: number;
    status:
      | "initial"
      | "highlight"
      | "recursionUnwindingCalling"
      | "recursionCallingActive"
      | "face";
  }[];
}

interface UseVisualizerLogicProps {
  minIterations: number;
  maxIterations: number;
  initialVariableText: (size: number) => number; // Function to determine initial variable display
  idPrefix: string; // e.g., 'loop', 'recursionUnwinding', 'recursionCalling'
}

const DELAY_MS = 500; // Standard delay for highlights
const ACTION_DELAY_MS = 700; // Standard delay for action (face change)
const HIGHLIGHT_REMOVE_DELAY_MS = 100; // Small delay for highlight removal

export const useVisualizerLogic = ({
  minIterations,
  maxIterations,
  initialVariableText,
  idPrefix,
}: UseVisualizerLogicProps) => {
  const [state, setState] = useState<VisualizerState>({
    inputSize: "",
    validationMessage: "Value should be between 1 and 10.",
    showVisualizer: false,
    isButtonDisabled: true,
    currentVariable: 0,
    arrayLength: 0,
    elements: [],
  });

  // Refs to directly access DOM elements for status display
  const loopVariableRef = useRef<HTMLSpanElement>(null);
  const equalSignRef = useRef<HTMLSpanElement>(null);
  const arrayLengthRef = useRef<HTMLSpanElement>(null);

  // Helper to create initial elements
  const createInitialElements = useCallback(
    (size: number) => {
      const newElements = Array.from({ length: size }, (_, i) => ({
        content: i + 1,
        index: i,
        status: "initial" as "initial",
      }));
      setState((prevState) => ({
        ...prevState,
        elements: newElements,
        currentVariable: initialVariableText(size),
        arrayLength: size,
      }));
    },
    [initialVariableText]
  );

  // Input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const parsedSize = parseInt(inputValue, 10);

      let newState: Partial<VisualizerState> = {
        inputSize: inputValue,
        validationMessage: "Value should be between 1 and 10.",
        showVisualizer: false,
        isButtonDisabled: true,
        elements: [], // Clear elements on any input change
      };

      if (inputValue === "") {
        // Input is empty
        setState((prevState) => ({ ...prevState, ...newState }));
        return;
      }

      const isNumeric = !isNaN(parsedSize);
      const isWithinRange =
        isNumeric && parsedSize >= minIterations && parsedSize <= maxIterations;

      if (isWithinRange) {
        newState.showVisualizer = true;
        newState.isButtonDisabled = false;
        createInitialElements(parsedSize); // Initialize elements for valid input
      } else {
        // Invalid input
        newState.validationMessage = "Value should be between 1 and 10.";
        newState.showVisualizer = false;
        newState.isButtonDisabled = true;
        newState.inputSize = ""; // Erase invalid input
      }
      setState((prevState) => ({ ...prevState, ...newState }));
    },
    [minIterations, maxIterations, createInitialElements]
  );

  // Effect to update DOM refs for loop status display
  useEffect(() => {
    if (loopVariableRef.current) {
      loopVariableRef.current.textContent = String(state.currentVariable);
    }
    if (arrayLengthRef.current) {
      arrayLengthRef.current.textContent = String(state.arrayLength);
    }
    if (equalSignRef.current) {
      // Remove animation class on re-initialization
      equalSignRef.current.classList.remove("animate-end");
      // Ensure visibility for loop, hidden for recursion
      if (idPrefix === "loop") {
        equalSignRef.current.classList.remove("hidden");
        arrayLengthRef.current?.classList.remove("hidden");
      } else {
        equalSignRef.current.classList.add("hidden");
        arrayLengthRef.current?.classList.add("hidden");
      }
    }
  }, [state.currentVariable, state.arrayLength, idPrefix]);

  // Common function to update an element's status
  const updateElementStatus = useCallback(
    (
      index: number,
      newStatus: VisualizerState["elements"][0]["status"],
      newContent?: string | number
    ) => {
      setState((prevState) => {
        const newElements = [...prevState.elements];
        if (newElements[index]) {
          newElements[index] = {
            ...newElements[index],
            status: newStatus,
            ...(newContent !== undefined && { content: newContent }),
          };
        }
        return { ...prevState, elements: newElements };
      });
    },
    []
  );

  // Common function to update loop variable display
  const updateCurrentVariable = useCallback((value: number) => {
    if (loopVariableRef.current) {
      loopVariableRef.current.textContent = String(value);
    }
  }, []);

  // Common function to trigger end animation on variable
  const triggerEndAnimation = useCallback(() => {
    if (idPrefix === "loop" && equalSignRef.current) {
      equalSignRef.current.classList.add("animate-end");
    } else if (loopVariableRef.current) {
      // For recursive visualizers
      loopVariableRef.current.classList.add("animate-end");
    }
  }, [idPrefix]);

  // Common function to reset end animation
  const resetEndAnimation = useCallback(() => {
    if (idPrefix === "loop" && equalSignRef.current) {
      equalSignRef.current.classList.remove("animate-end");
    } else if (loopVariableRef.current) {
      loopVariableRef.current.classList.remove("animate-end");
    }
  }, [idPrefix]);

  return {
    ...state,
    handleInputChange,
    createInitialElements, // Expose for initial setup in animation functions
    updateElementStatus,
    updateCurrentVariable,
    triggerEndAnimation,
    resetEndAnimation,
    loopVariableRef,
    equalSignRef,
    arrayLengthRef,
    DELAY_MS,
    ACTION_DELAY_MS,
    HIGHLIGHT_REMOVE_DELAY_MS,
    minIterations,
    maxIterations,
  };
};
