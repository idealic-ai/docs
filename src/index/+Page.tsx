import { Link } from '../components/Link';

export default function Page() {
  return (
    <div>
      <h1>AI System Bible Documentation</h1>
      <p>
        This documentation provides a comprehensive overview of our self-evolving operating system
        architecture, serving as the authoritative reference for system design, principles, and
        components.
      </p>

      <h2>Documentation Structure</h2>
      <ul>
        <li>
          <Link href="/chapter/complete">Complete Bible</Link> - The full document with all chapters
        </li>
        <li>
          <Link href="/chapter/vibes">Chapter 1: Vibes & Their Manifestations</Link> - Fundamental
          units and their implementations
        </li>
        <li>
          <Link href="/chapter/determinism">Chapter 4: Determinism</Link> — Controlling
          Unpredictability
        </li>
      </ul>
    </div>
  );
}
