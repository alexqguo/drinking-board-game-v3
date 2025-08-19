import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Drinking Board Game Engine Documentation"
      description="Technical documentation and guides for the Drinking Board Game Engine."
    >
      <header
        style={{
          background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Drinking Board Game Engine</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/tutorial"
            style={{ background: '#fff', color: '#1e3c72', border: 'none' }}
          >
            How to Play
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/technical-overview"
            style={{ background: '#2a5298', color: '#fff', border: 'none' }}
          >
            Technical Docs
          </Link>
        </div>
      </header>
      <main style={{ padding: '2rem 0', maxWidth: 800, margin: '0 auto' }}>
        <section>
          <h2>About This Project</h2>
          <p>
            This documentation site provides guides, tutorials, and a full architectural overview
            for the DBG Engine.
          </p>
        </section>
      </main>
    </Layout>
  );
}
