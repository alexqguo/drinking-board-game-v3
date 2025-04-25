import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

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
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Build, extend, and understand the open-source engine powering custom board games.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/tutorial"
            style={{ background: '#fff', color: '#1e3c72', border: 'none' }}
          >
            Get Started (Tutorial)
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/technical-overview"
            style={{ background: '#2a5298', color: '#fff', border: 'none' }}
          >
            Technical Overview
          </Link>
        </div>
      </header>
      <main style={{ padding: '2rem 0', maxWidth: 800, margin: '0 auto' }}>
        <section>
          <h2>About This Project</h2>
          <p>
            This documentation site provides guides, tutorials, and a full API reference for the
            Drinking Board Game Engine. Whether you're building a new game, extending the engine, or
            just exploring, you'll find everything you need here.
          </p>
        </section>
      </main>
    </Layout>
  );
}
