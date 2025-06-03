import DesignSystemShowcase from "./components/DesignSystemShowcase";
import LoopVisualizer from "./components/LoopVisualizer";
import RecursiveCallingVisualizer from "./components/RecursiveCallingVisualizer";
import RecursiveUnwindingVisualizer from "./components/RecursiveUnwindingVisualizer";
import styles from "./styles/Visualizer.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <LoopVisualizer />
      <RecursiveCallingVisualizer />
      <RecursiveUnwindingVisualizer />
    </div>
  );
}
