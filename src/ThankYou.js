import { Link } from 'react-router-dom';
import './App.css';

function ThankYou() {
  return (
    <main className="thank-you-page">
      <section className="thank-you-card">
        <p className="section-eyebrow">Thanks</p>
        <h1>We&apos;ll be in touch soon.</h1>
        <p>
          Your message came through. If it&apos;s urgent, email{' '}
          <a href="mailto:solomon@devsdecide.com">solomon@devsdecide.com</a>.
        </p>
        <Link className="btn-primary" to="/">
          Back to homepage
        </Link>
      </section>
    </main>
  );
}

export default ThankYou;
