# AGENTS.md

Rules for any agent changing this site. Privacy and accessibility are release requirements, not nice-to-haves: a change that breaks either is not done.

## Privacy, cookies, and tracking

The site keeps legal exposure low under state wiretap laws (CIPA and similar). Keep it that way.

- **No new third-party scripts, pixels, cookies, embeds, or widgets without asking the owner first.** That includes analytics, chat widgets, video embeds, maps, fonts loaded from a third-party domain at runtime, and scheduling tools.
- **Never add** the Meta/Facebook Pixel, TikTok Pixel, LinkedIn Insight Tag, or session-replay tools (Hotjar, Microsoft Clarity, FullStory, etc.). These are the main targets of wiretap suits.
- **Google Analytics** (`app/layout.tsx`, `lib/analytics.ts`) stays measurement-only. Never send names, emails, phone numbers, or message text to GA; route new events through the `nonPii` helpers in `lib/analytics.ts`. Don't enable Google Signals, ads personalization, or Google Ads links in code or config.
- **`app/privacy/page.tsx` must match reality.** Any change that adds, removes, or changes what data is collected, which cookies are set, or which third parties receive data must update the privacy page in the same change and bump `EFFECTIVE_DATE`.
- **Don't persist personal data in the browser.** No new `localStorage`/cookie storage of names, emails, or messages. Prefer `sessionStorage` and clear it once used.
- **State geo-block** (`lib/geo-block.ts`, wired in `proxy.ts`) blocks CA, PA, MA, FL, WA, and MD. Keep the `proxy.ts` matcher covering every route, keep the search/link-preview crawler exemption (Googlebot crawls from California), and keep `lib/geo-block.test.ts` passing. Don't change the state list without asking.

## Accessibility (ADA / WCAG 2.1 AA)

Every page and component must meet WCAG 2.1 AA.

- **Structure:** one `<h1>` per page, headings in order without skipping levels, content inside `<main>`, `lang` set on `<html>`.
- **Images:** meaningful images get descriptive `alt`; decorative ones get `alt=""` or `aria-hidden`.
- **Forms:** every input has a visible `<label>` (or `aria-label` when a visible label is impossible). Errors use `role="alert"` and say how to fix the problem. Required fields are marked in text, not color alone.
- **Keyboard:** everything clickable works with Tab, Enter, and Space, in a logical order. Use `<button>` and `<a>`, not clickable `<div>`s. Never remove focus outlines without a visible `focus-visible` replacement.
- **Color:** text contrast at least 4.5:1 (3:1 for text 24px+ or 18.66px+ bold, and for UI borders and icons). Never convey meaning by color alone.
- **Dynamic content:** updates that appear without a page load (chat replies, status, errors) use `aria-live` or `role="alert"`/`role="log"`.
- **Motion:** respect `prefers-reduced-motion` (see `app/globals.css`). No autoplaying media with sound, nothing flashing more than 3 times a second.
- **Touch targets:** at least 24×24px; aim for 44×44px on primary actions.
- **Links:** link text says where it goes; no bare "click here."
- **Zoom:** the layout works at 200% zoom and at 320px width without horizontal scrolling.

## Before pushing

- Run `npm test`, `npx tsc --noEmit`, and `npm run lint`. All must pass.
- For UI changes, check the changed pages with the keyboard only and run an accessibility scan (Lighthouse or axe) on them. Fix anything at AA level before pushing.
- Pushing to the `vercel` branch deploys production.
