import { FC, ReactNode } from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';

interface Props {
  buttons: ReactNode[];
}

const baseStyling: React.CSSProperties = {
  position: 'absolute',
  zIndex: 9999,
  pointerEvents: 'auto',
  bottom: 0,
  left: 0,
};

export const Toolbar: FC<Props> = ({ buttons }) => {
  const ui = useUI();

  return (
    <div style={baseStyling}>
      <ui.Row gap={UISize.m} padding={UISize.l}>
        {buttons}
      </ui.Row>
    </div>
  );
};
