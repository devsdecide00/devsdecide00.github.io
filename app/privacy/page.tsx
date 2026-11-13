import type { Metadata } from 'next';
import Nav from '../components/nav';
import Footer from '../components/footer';

const title = 'Privacy Policy | Developers Decide';
const description = 'What devsdecide.com collects, why, and how to ask for it to be deleted.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: 'https://devsdecide.com/privacy' },
};

const EFFECTIVE_DATE = 'November 13, 2026';

const h2 = 'font-extrabold text-[26px] sm:text-[30px] leading-[1.1] tracking-[-0.6px] m-0 mt-12 mb-4';
const p = 'text-[18px] leading-[1.6] text-ink-soft m-0 mb-4';
const li = 'text-[18px] leading-[1.6] text-ink-soft mb-2';
const a = 'text-ink underline';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[760px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20">
        <h1 className="font-extrabold text-[clamp(40px,8vw,64px)] leading-[0.95] tracking-[-2px] m-0 mb-4">
          Privacy Policy
        </h1>
        <p className={p}>Effective {EFFECTIVE_DATE}</p>
        <p className={p}>
          Developers Decide LLC (&ldquo;we&rdquo;) runs devsdecide.com. This page explains what information the site
          collects, why, and what you can do about it.
        </p>

        <h2 className={h2}>Information you give us</h2>
        <p className={p}>
          When you submit the contact form, we collect your name, company, email address, industry, team size, and
          whatever you write about your business. We use it only to reply to you and to prepare for your assessment.
          It is sent to us by email through our email provider, Resend.
        </p>
        <p className={p}>
          Your browser also keeps a copy of your submission so the thank-you page can show it back to you. It stays on
          your device and is not sent anywhere else. You can remove it by clearing this site&rsquo;s data in your
          browser.
        </p>

        <h2 className={h2}>The &ldquo;Try it yourself&rdquo; demo</h2>
        <p className={p}>
          Messages you type into the demo chat are sent to Anthropic, our AI provider, to generate replies. Please
          don&rsquo;t enter personal or sensitive information there. We don&rsquo;t store demo conversations.
        </p>

        <h2 className={h2}>Analytics and cookies</h2>
        <p className={p}>We use these services to understand how the site is used:</p>
        <ul className="pl-6 m-0 mb-4">
          <li className={li}>
            <strong className="text-ink">Google Analytics.</strong> Sets cookies (such as <code>_ga</code>) to count
            visits, see which pages are viewed, and record clicks on buttons and contact form submissions. Google
            receives information such as your IP address, browser, device, and pages visited. See{' '}
            <a className={a} href="https://policies.google.com/technologies/partner-sites">
              how Google uses data from sites that use its services
            </a>
            . You can opt out with the{' '}
            <a className={a} href="https://tools.google.com/dlpage/gaoptout">
              Google Analytics opt-out browser add-on
            </a>
            .
          </li>
          <li className={li}>
            <strong className="text-ink">Vercel Analytics and Speed Insights.</strong> Measure page views and page
            speed without cookies.
          </li>
        </ul>
        <p className={p}>
          The site also uses a few cookies that it needs to work: Cloudflare Turnstile checks that form and demo
          submissions come from a person, and a short-lived cookie (10 minutes) remembers that you passed that check.
          Your IP address is used briefly to limit repeated submissions.
        </p>
        <p className={p}>
          You can block or delete cookies in your browser settings. The site will still work, though the anti-spam
          check may ask you again.
        </p>

        <h2 className={h2}>What we don&rsquo;t do</h2>
        <p className={p}>
          We don&rsquo;t sell your personal information or share it for advertising. We only share it with the
          service providers named above, so they can run the site for us, or when the law requires it.
        </p>

        <h2 className={h2}>Do Not Track</h2>
        <p className={p}>
          Browsers&rsquo; &ldquo;Do Not Track&rdquo; signals have no agreed standard, so the site does not respond to
          them. Use the Google Analytics opt-out above instead.
        </p>

        <h2 className={h2}>How long we keep it</h2>
        <p className={p}>
          We keep contact form messages as long as we need them to work with you, then delete them on request.
          Google Analytics data is kept according to the retention setting in our Google Analytics account.
        </p>

        <h2 className={h2}>Your choices</h2>
        <p className={p}>
          To see, correct, or delete the information you sent us, email{' '}
          <a className={a} href="mailto:solomon@devsdecide.com">solomon@devsdecide.com</a>. We&rsquo;ll respond within
          one month.
        </p>

        <h2 className={h2}>Children</h2>
        <p className={p}>This site is for businesses and is not directed at children under 13.</p>

        <h2 className={h2}>Changes</h2>
        <p className={p}>
          If we change this policy, we&rsquo;ll update it here and change the effective date at the top.
        </p>

        <h2 className={h2}>Contact</h2>
        <p className={p}>
          Developers Decide LLC, Hoover, Alabama.{' '}
          <a className={a} href="mailto:solomon@devsdecide.com">solomon@devsdecide.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
