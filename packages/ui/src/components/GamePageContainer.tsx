import { ReactNode } from 'react';

interface Props {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}

export const GamePageContainer = ({ sidebarContent, mainContent }: Props) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '20% 1fr', minHeight: '100vh' }}>
      <section>
        {sidebarContent}
      </section>
      <main>
        {mainContent}
      </main>
    </div>
  );
};