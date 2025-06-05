import VisualizerContainer from "./VisualizerContainer";
import VisualizerExtras from "./VisualizerExtras";

export default function Visualizer() {
  return (
    <article>
      <VisualizerContainer title="Loop Visualizer">
        <div></div>
      </VisualizerContainer>
      <VisualizerExtras />
    </article>
  );
}
