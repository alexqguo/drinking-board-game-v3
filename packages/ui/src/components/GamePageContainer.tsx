import { CSSProperties, ReactNode } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';

interface Props {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}

const wrapperStyles: { [key: string]: CSSProperties} = {
  s: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
  l: { display: 'grid', gridTemplateColumns: '20% 1fr', minHeight: '100vh' }
};

export const GamePageContainer = ({ sidebarContent, mainContent }: Props) => {
  const screenSize = useScreenSize();

  return (
    <div style={wrapperStyles[screenSize]}>
      <section>
        {sidebarContent}
      </section>
      <main>
        {mainContent}
      </main>
    </div>
  );
};