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
    height: '100vh'
  },
  l: {
    display: 'grid',
    gridTemplateColumns: '20% 1fr',
    height: '100vh'
  }
};

const mainStyles: { [key: string]: CSSProperties } = {
  s: {
    flexGrow: 1,
    overflowY: 'auto'
  },
  l: {
    overflowY: 'auto',
    height: '100vh'
  }
};

export const GamePageContainer = ({ sidebarContent, mainContent }: Props) => {
  const screenSize = useScreenSize();

  return (
    <div style={wrapperStyles[screenSize]}>
      <section>
        {sidebarContent}
      </section>
      <main style={mainStyles[screenSize]}>
        {mainContent}
      </main>
    </div>
  );
};