import { ReactNode } from 'react';
import { useUI } from '../context/UIEnvironmentContext';

interface Props {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}

export const GamePageContainer = ({ sidebarContent, mainContent }: Props) => {
  const ui = useUI();
  return (
    <ui.Col height="100vh">
      <section
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        }}
      >
        {sidebarContent}
      </section>
      <main
        style={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
        {mainContent}
      </main>
    </ui.Col>
  );
};
