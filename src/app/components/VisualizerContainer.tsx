import styles from "../styles/GlobalStyles.module.css";

const VisualizerContainer: React.FC<{
  children: React.ReactNode;
  title?: string;
}> = ({ children, title }) => {
  return (
    <div className={`${styles.container}`}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default VisualizerContainer;
