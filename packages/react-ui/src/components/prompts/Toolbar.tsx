import { FC, ReactNode } from 'react';
import { UISize, useUI } from '../../context/UIEnvironmentContext';
import { useScreenSize } from '../../hooks/useScreenSize';

interface Props {
  buttons: ReactNode[];
}

const baseStyling: React.CSSProperties = {
  position: 'absolute',
  zIndex: 9999,
  pointerEvents: 'auto',
};

const getStyling = (size: 's' | 'l') => ({
  ...baseStyling,
  ...(size === 's'
    ? {
        bottom: 0,
        left: 0,
      }
    : {
        top: 0,
        right: 0,
      }),
});

export const Toolbar: FC<Props> = ({ buttons }) => {
  const ui = useUI();
  const { screenSize } = useScreenSize();

  return (
    <div style={getStyling(screenSize)}>
      <ui.Row gap={UISize.m} padding={UISize.l}>
        {buttons}
      </ui.Row>
    </div>
  );
};
