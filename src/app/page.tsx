import DesignSystemShowcase from "./components/DesignSystemShowcase";
import styles from "./styles/Visualizer.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <DesignSystemShowcase />
    </div>
  );
}
