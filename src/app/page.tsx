import LoopVisualizer from "./components/LoopVisualizer";
import RecursiveCallingVisualizer from "./components/RecursiveCallingVisualizer";
import RecursiveUnwindingVisualizer from "./components/RecursiveUnwindingVisualizer";
import ThemeToggleButton from "./components/ThemeToggleButton";
import styles from "./styles/Visualizer.module.css";

export default function Home() {
  return (
    <div className={styles.mainContentWrapper}>
      <ThemeToggleButton />
      <main className={styles.main}>
        <LoopVisualizer />
        <RecursiveCallingVisualizer />
        <RecursiveUnwindingVisualizer />
      </main>
    </div>
  );
}
