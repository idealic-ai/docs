import { Link } from '../components/Link';

export default function Page() {
  return (
    <main>
      <article>
        <section>
          <h1>AI System Bible Documentation</h1>
          <p>
            This documentation provides a comprehensive overview of our self-evolving operating
            system architecture, serving as the authoritative reference for system design,
            principles, and components.
          </p>

          <h2>List of Documents</h2>
          <ul>
            <li>
              <Link href="/manifesto/">The Co-Liberation Manifesto</Link> &mdash; A vision for a new
              partnership between humanity, AI, and ideas.
            </li>
            <li>
              <Link href="/rfc/">RFCs</Link> &mdash; A set of normative documents that are the basis
              for the AI System Bible: Protocol, Agent subsystems and Services.
            </li>
            <li>
              <Link href="/blueprint/">Blueprints</Link> &mdash; A larger and outdated vision of the
              system, that is used as a basis for extracted RFCs.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
