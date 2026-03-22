import './App.css';

const calendlyUrl = 'https://calendly.com/solomon-12/15-minute-session';
const emailAddress = 'solomon@devsdecide.com';

const problemCards = [
  {
    icon: '⏱',
    title: 'Your team does the same things over and over',
    description:
      "Scheduling, follow-ups, answering the same customer questions, moving data between systems. Hours of work that doesn't grow the business.",
  },
  {
    icon: '💸',
    title: "Your team is doing work AI was built for",
    description:
      'Tasks that eat up your budget every month can be handled by custom AI solutions. We identify those tasks, build the tools, and free your team to focus on what actually grows the business.',
  },
  {
    icon: '🏢',
    title: "Big consulting firms don't serve businesses your size",
    description:
      "Enterprise AI firms want enterprise contracts. General AI tools aren't built for your specific workflow. You're left to figure it out alone.",
  },
  {
    icon: '🔧',
    title: "You can't afford to experiment with the wrong thing",
    description:
      "Every hour spent chasing an AI tool that doesn't fit is an hour away from running the business. You need someone who's already done the work of knowing what works.",
  },
];

const steps = [
  {
    title: 'Bottleneck call',
    description:
      "30 minutes. You tell me what's grinding. I listen for where time and money are actually going.",
  },
  {
    title: 'Scoped proposal',
    description:
      'One specific thing to fix first. No ten-part roadmap. A clear problem, a clear tool, a clear price.',
  },
  {
    title: 'Build & train',
    description:
      'I build the tool and train your team on it. The goal is that it runs without me being in the room.',
  },
  {
    title: 'Monthly retainer',
    description:
      'I stay on. Fix what breaks. Find the next thing. Cheaper than one part-time hire, more valuable than most.',
  },
];

const deliverables = [
  {
    icon: '💬',
    title: 'Customer FAQ automation',
    description:
      'AI that answers your most common customer questions via your website, text, or email 24/7, without your staff touching it.',
  },
  {
    icon: '📋',
    title: 'Intake & scheduling workflows',
    description:
      'Eliminate the back-and-forth of booking, onboarding, and follow-up. Automated flows that feel personal, not robotic.',
  },
  {
    icon: '📝',
    title: 'Proposal & document generation',
    description:
      'Turn a few inputs into a polished quote, contract, or report in seconds instead of an hour.',
  },
  {
    icon: '📊',
    title: 'Operations dashboards',
    description:
      "Stop digging through spreadsheets. A single view of what's actually happening in your business, updated automatically.",
  },
  {
    icon: '📞',
    title: 'Call & review summarization',
    description:
      'Every customer call or review turned into structured notes, follow-up tasks, and actionable data automatically.',
  },
  {
    icon: '🔗',
    title: 'System integrations',
    description:
      "If you're copying data between software, there's probably a better way. I find the connections and automate the handoffs.",
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '$1,500',
    cadence: '/mo',
    description: 'For businesses that have one clear problem and want to solve it fast.',
    features: [
      'Bottleneck discovery call',
      'One AI tool built and deployed',
      'Team training session',
      '30-day support window',
      'Monthly check-in call',
    ],
    ctaClassName: 'pricing-cta outline',
    ctaLabel: 'Get started',
  },
  {
    name: 'Growth',
    price: '$2,500',
    cadence: '/mo',
    description:
      'For businesses ready to systematically eliminate inefficiency across the operation.',
    features: [
      'Everything in Starter',
      'Up to 3 active AI tools',
      'Ongoing iteration and improvement',
      'Unlimited support requests',
      'Bi-weekly strategy calls',
      'Priority response time',
    ],
    featured: true,
    ctaClassName: 'pricing-cta primary',
    ctaLabel: 'Get started',
  },
  {
    name: 'Custom',
    price: "Let's talk",
    description:
      'Multi-location businesses, complex integrations, or teams with specific technical requirements.',
    features: [
      'Everything in Growth',
      'Unlimited tools and scope',
      'Dedicated Slack channel',
      'Custom reporting and dashboards',
      'On-site training available',
    ],
    ctaClassName: 'pricing-cta outline',
    ctaLabel: 'Contact me',
    customPrice: true,
  },
];

const industries = [
  'HVAC & mechanical',
  'Commercial cleaning',
  'Property management',
  'Bookkeeping & accounting',
  'Construction & contracting',
  'Staffing agencies',
  'Landscaping',
  'Senior care & home health',
  'Gyms & fitness studios',
  'Insurance agencies',
  'Auto repair',
  'Pest control',
  'Plumbing & electrical',
  'Logistics & delivery',
];

function App() {
  return (
    <div className="site-shell">
      <nav className="site-nav">
        <a className="nav-logo" href="#top">
          Developers<span>Decide</span>
        </a>
        <a
          className="cta-nav"
          href={calendlyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Let&apos;s talk
        </a>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-eyebrow">AI for Small Business</span>
            <h1>
              Your business runs on people.
              <br />
              <em>Let AI handle the rest.</em>
            </h1>
            <p>
              You didn&apos;t start your business to spend half your day on repetitive
              tasks. I find exactly where your time is bleeding and fix it with AI tools
              your team will actually use.
            </p>
            <div className="hero-cta-group">
              <a
                href={calendlyUrl}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Book a free bottleneck call
              </a>
              <a href="#how" className="btn-ghost">
                See how it works →
              </a>
            </div>
          </div>

          <aside className="hero-aside">
            <p className="aside-label">How it works</p>
            <div className="aside-item">
              <div className="aside-num">1</div>
              <div className="aside-text">
                <strong>Find the bottleneck.</strong> One conversation. No jargon, no
                pitch deck.
              </div>
            </div>
            <div className="aside-item">
              <div className="aside-num">2</div>
              <div className="aside-text">
                <strong>Build the fix.</strong> Custom AI tools scoped to your exact
                problem. Nothing generic.
              </div>
            </div>
            <div className="aside-item">
              <div className="aside-num">3</div>
              <div className="aside-text">
                <strong>Train your team.</strong> Tools your staff will use on day one.
                Not just built and dropped.
              </div>
            </div>
            <div className="aside-item">
              <div className="aside-num">4</div>
              <div className="aside-text">
                <strong>Stay and improve.</strong> Monthly retainer. I stick around, fix
                what breaks, and keep finding more.
              </div>
            </div>
            <hr className="aside-divider" />
            <div className="aside-stat">
              <div className="aside-stat-num">10-30%</div>
              <div className="aside-stat-label">
                typical labor cost recovered in first 90 days
              </div>
            </div>
          </aside>
        </section>

        <div className="marquee-band" aria-label="Industries served">
          <div className="marquee-track">
            HVAC &amp; HVAC SERVICE <span>◆</span> CLEANING COMPANIES <span>◆</span>{' '}
            PROPERTY MANAGEMENT <span>◆</span> BOOKKEEPING FIRMS <span>◆</span>{' '}
            CONSTRUCTION <span>◆</span> STAFFING AGENCIES <span>◆</span> GYMS &amp;
            FITNESS STUDIOS <span>◆</span> LANDSCAPING <span>◆</span> SENIOR CARE{' '}
            <span>◆</span> HVAC &amp; HVAC SERVICE <span>◆</span> CLEANING COMPANIES{' '}
            <span>◆</span> PROPERTY MANAGEMENT <span>◆</span> BOOKKEEPING FIRMS{' '}
            <span>◆</span> CONSTRUCTION <span>◆</span> STAFFING AGENCIES <span>◆</span>{' '}
            GYMS &amp; FITNESS STUDIOS <span>◆</span> LANDSCAPING <span>◆</span> SENIOR
            CARE <span>◆</span>
          </div>
        </div>

        <section>
          <p className="section-eyebrow">The problem</p>
          <h2 className="section-heading">
            You feel AI changing everything.
            <br />
            You just don&apos;t know where to start.
          </h2>
          <p className="section-sub">
            You&apos;re not behind because you&apos;re not smart. You&apos;re behind because
            running a business leaves no margin for experimentation. That&apos;s what I&apos;m
            here for.
          </p>

          <div className="problem-grid">
            {problemCards.map((card) => (
              <article className="problem-card" key={card.title}>
                <div className="problem-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="full-bleed how-bg" id="how">
          <div className="inner">
            <p className="section-eyebrow">The process</p>
            <h2 className="section-heading">Four steps, no fluff.</h2>
            <p className="section-sub">
              I don&apos;t come in with a slide deck. I come in with questions. The work
              starts in the first conversation.
            </p>

            <div className="steps">
              {steps.map((step, index) => (
                <article className="step" key={step.title}>
                  <div className="step-num">{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="section-eyebrow">What&apos;s included</p>
          <h2 className="section-heading">Not tools. Solutions.</h2>
          <p className="section-sub">
            Every engagement is custom. But here are the kinds of things I build most
            often.
          </p>

          <div className="deliverables">
            {deliverables.map((deliverable) => (
              <article className="deliverable" key={deliverable.title}>
                <div className="deliverable-icon" aria-hidden="true">
                  {deliverable.icon}
                </div>
                <div>
                  <h3>{deliverable.title}</h3>
                  <p>{deliverable.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="full-bleed how-bg" id="pricing">
          <div className="inner">
            <p className="section-eyebrow">Pricing</p>
            <h2 className="section-heading">Simple. Predictable. No surprises.</h2>
            <p className="section-sub">
              Month-to-month. No long-term contracts required. Cancel anytime.
            </p>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <article
                  className={`pricing-card${plan.featured ? ' featured' : ''}`}
                  key={plan.name}
                >
                  {plan.featured ? <div className="pricing-badge">Most popular</div> : null}
                  <h3>{plan.name}</h3>
                  <div
                    className={`pricing-price${plan.customPrice ? ' pricing-price-custom' : ''}`}
                  >
                    {plan.price}
                    {plan.cadence ? <span>{plan.cadence}</span> : null}
                  </div>
                  <p className="pricing-desc">{plan.description}</p>
                  <ul className="pricing-features">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    href={calendlyUrl}
                    className={plan.ctaClassName}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {plan.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section>
          <p className="section-eyebrow">Who this is for</p>
          <h2 className="section-heading">
            If you run a service business with a team, this is for you.
          </h2>
          <p className="section-sub">
            The best fit is a business with 2-50 employees, recurring customers, and
            repeatable internal processes. You don&apos;t need to understand AI. You just
            need to know something is taking too long.
          </p>

          <div className="industries">
            {industries.map((industry) => (
              <div className="industry-pill" key={industry}>
                {industry}
              </div>
            ))}
          </div>
        </section>

        <div className="quote-section">
          <div className="quote-inner">
            <span className="quote-mark">&quot;</span>
            <blockquote>
              Finding businesses that are actually running inefficiently and going into
              them to figure out where to plug in AI. That is going to be a huge option
              for entrepreneurs.
            </blockquote>
            <p className="quote-attr">Amjad Masad | CEO, Replit</p>
          </div>
        </div>

        <section className="cta-section" id="contact">
          <h2>Start with one conversation.</h2>
          <p>
            No pitch. No proposal until you ask for one. Just 30 minutes to find out if
            there&apos;s something worth fixing.
          </p>
          <form
            className="cta-form"
            action={calendlyUrl}
            method="get"
            target="_blank"
            rel="noreferrer"
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              aria-label="Email address"
            />
            <button type="submit">Book a call</button>
          </form>
          <p className="cta-note">
            Or email directly:{' '}
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
          </p>
        </section>
      </main>

      <footer>
        <p>© 2026 Developers Decide LLC | Hoover, Alabama</p>
        <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
      </footer>
    </div>
  );
}

export default App;
