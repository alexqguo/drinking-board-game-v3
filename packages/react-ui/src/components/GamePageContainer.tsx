import { ReactNode } from 'react';

interface Props {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
}

/**
 * remaining todos
 * - host status icon on the left side
 * - drawer for message list
 * - hover for player avatars
 * - view turn order
 */
export const GamePageContainer = ({ sidebarContent, mainContent }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
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
    </div>
  );
};
