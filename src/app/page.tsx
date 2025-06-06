import Header from "./components/Header";
import LoopVisualizer from "./components/LoopVisualizer";
import RecursiveCallingVisualizer from "./components/RecursiveCallingVisualizer";
import RecursiveUnwindingVisualizer from "./components/RecursiveUnwindingVisualizer";
import ThemeToggleButton from "./components/ThemeToggleButton";
import styles from "./styles/GlobalStyles.module.css";

export default function Home() {
  return (
    <div className={styles.mainContentWrapper}>
      <ThemeToggleButton />
      <Header />
      <main className={styles.main}>
        <LoopVisualizer />
        <RecursiveCallingVisualizer />
        <RecursiveUnwindingVisualizer />
      </main>
    </div>
  );
}
