import { UISize, useUI } from '../../context/UIEnvironmentContext';

const styling: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 9999,
  pointerEvents: 'auto',
};

export const Toolbar = () => {
  const ui = useUI();
  return (
    <div style={styling}>
      <ui.Row padding={UISize.m}>
        <ui.Button size={UISize.xs}>📍</ui.Button>
      </ui.Row>
    </div>
  );
};
