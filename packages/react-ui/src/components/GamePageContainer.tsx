import { CSSProperties, ReactNode } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';

interface Props {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}

const wrapperStyles: { [key: string]: CSSProperties } = {
  s: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  l: {
    display: 'grid',
    gridTemplateColumns: '20% 1fr',
    height: '100vh',
  },
};

const mainStyles: { [key: string]: CSSProperties } = {
  s: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  l: {
    overflowY: 'auto',
    height: '100vh',
  },
};

const sidebarStyles: { [key: string]: CSSProperties } = {
  s: {
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  l: {
    boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
};

export const GamePageContainer = ({ sidebarContent, mainContent }: Props) => {
  const { screenSize } = useScreenSize();

  return (
    <div style={wrapperStyles[screenSize]}>
      <section style={sidebarStyles[screenSize]}>{sidebarContent}</section>
      <main style={mainStyles[screenSize]}>{mainContent}</main>
    </div>
  );
};
