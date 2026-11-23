# STYLE.md

Visual rules for this site. Most "it looks a bit off" problems come from a handful of small inconsistencies, not one big mistake. These rules prevent them. Tokens live in `app/globals.css` (`@theme`); use them, don't invent new values.

The five rules: **spacing on a grid, a fixed type scale, a small palette in the right proportions, one icon set and no emoji, and remove anything that isn't helping.**

## 1. Spacing: 8px grid

Every margin, padding, and gap is a multiple of 8px. 4px is allowed only for tight inline spacing (icon-to-label, badge padding).

| px | Tailwind | Typical use |
|----|----------|-------------|
| 4  | `1`  | icon ↔ label, inside badges |
| 8  | `2`  | related items in a row |
| 16 | `4`  | items in a group, small card padding |
| 24 | `6`  | card padding |
| 32 | `8`  | below section headings |
| 48 | `12` | between groups |
| 64 | `16` | between sections (mobile) |
| 96 | `24` | between sections (desktop) |

- Use Tailwind's scale (`p-6`, `gap-4`), not arbitrary values (`p-[13px]`, `mt-[18px]`). Arbitrary spacing is allowed only for `env(safe-area-inset-*)`.
- Related things sit closer together than unrelated things. Spacing is how grouping is shown.
- Once a value is chosen for a role, reuse it: every card gets the same padding, every section heading the same gap below it.

## 2. Typography: one font, fixed scale

**Font:** Bricolage Grotesque (`--font-display`, `--font-sans`), loaded through `next/font` so it is self-hosted. Don't add a second family without a reason; never add more than two. Never load fonts from a third-party domain at runtime (see `AGENTS.md`). Avoid Inter; it reads as a template default.

**Scale:** use only these sizes. They are theme tokens in `app/globals.css` and carry their own line-height and letter-spacing, so don't add `leading-[…]` or `tracking-[…]` next to them.

| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `text-jumbo` | `clamp(52px, 14.5vw, 120px)` | 800 | `/pitch` slides only |
| `text-display` | `clamp(48px, 12vw, 96px)` | 800 | page `<h1>`, final CTA, price |
| `text-h2` | `clamp(36px, 7vw, 56px)` | 800 | section headings |
| `text-h3` | 28px | 800 | sub-section headings, step titles |
| `text-title` | 22px | 700–800 | card titles, FAQ questions |
| `text-lead` | 20px | 400 | intro paragraph under a heading |
| `text-body` | 18px | 400 (700 for buttons/labels) | body copy, buttons, form fields |
| `text-small` | 16px | 400–700 | meta, chips, small buttons |
| `text-caption` | 14px | 400–700 | mock UI inside illustrations, chat |
| `text-micro` | 12px | 400–600 | uppercase eyebrows (`uppercase tracking-widest`) |

Two scale steps can be paired responsively (`text-lead sm:text-h3`). Illustrations drawn as graphics (`stamp.tsx`, `opengraph-image.tsx`, `icon.tsx`) are exempt.

- Each step must be clearly bigger than the one below it. Two sizes 1px apart (18/19, 21/22) are not a hierarchy; snap them to the nearest step.
- Adding a size is a deliberate decision: only if it will be reused in more than one place, and it gets added to this table in the same change.
- Hierarchy order on any screen: heading → subtitle → details. If the eye doesn't land on the heading first, the scale is being misused.
- Line length for body copy: 60–75 characters (`max-w-prose` or ~`65ch`).

> Use the classes above, never `text-[Npx]`.

## 3. Color: small palette, 60/30/10

**Palette** (from `globals.css`, no others):

| Role | Token | Hex |
|------|-------|-----|
| Background (60%) | `bg` | `#ffffff` |
| Surfaces (30%) | `bg-deep`, `rule` | `#f5f1fa`, `#e4dded` |
| Text | `ink`, `ink-soft`, `ink-faint` | `#24123a`, `#4d3d63`, `#6f6385` |
| Accent (10%) | `accent`, `accent-deep`, `accent-soft` | `#e8641e`, `#c94f10`, `#f8dfcf` |
| Highlights | `sun` (stickers/stamps), `mint` (time saved) | `#f2cd62`, `#c5e3cc` |

- **60/30/10:** ~60% neutral background, ~30% surfaces (cards, panels), ~10% accent. The accent is rare so it gets noticed; save it for the primary call to action and the one thing on the screen that matters most. One accent-colored CTA per view.
- `sun` and `mint` carry specific meaning. Don't use them decoratively.
- No hex values in components. If a needed color isn't a token, the answer is almost always an existing token.
- Never convey meaning by color alone; pair it with text or an icon.

**Contrast (WCAG AA, checked):**

| Pair | Ratio | Allowed for |
|------|-------|-------------|
| `ink` / `ink-soft` on `bg` or `bg-deep` | 15–17 / 8.7–9.7 | all text |
| `ink-faint` on `bg` | 5.5 | all text |
| `ink-faint` on `bg-deep` | 4.96 | all text |
| `accent-deep` on `bg` | 4.56 | all text |
| `accent-deep` on `bg-deep` | 4.09 | large text only (24px+, or 18.66px+ bold) |
| `accent` on `bg` | 3.35 | large text, icons, borders only |
| `ink` on `accent` | 5.13 | all text (preferred for buttons) |
| white on `accent` | 3.35 | large bold text only |
| `ink` on `sun` / `mint` | 11.2 / 12.5 | all text |

## 4. Icons: one set, no emoji

- **No emoji in the interface.** They render differently per device, bring their own colors that clash with the palette, and read as unfinished. Emoji are fine only inside user-generated content.
- Use **one** icon set. All icons share stroke width and style; mixing sets shows up as mismatched weights side by side. The set is `app/components/icons.tsx` (Lucide paths, stroke 2.5). Add new icons there, copied from Lucide; never from another set or a CDN.
- Icons take color from text tokens (`currentColor`) and size from the type scale (16, 20, or 24px).
- Decorative icons get `aria-hidden="true"`; icon-only buttons need an `aria-label`. Touch targets stay ≥24px, ≥44px for primary actions.
- Not everything needs an icon. Add one only if it speeds up scanning.

## 5. Remove what isn't helping

Generated UI tends to show every piece of information with every decoration. Before shipping a component:

1. **State its job.** e.g. "account summary: scanned first, shows essentials only."
2. **Move secondary data** (IDs, timestamps, metadata) to a detail view.
3. **Question each visual element.** Ask whether it helps someone scan:
   - **Borders:** drop if the surface color already separates it from the page.
   - **Dividers:** use spacing instead.
   - **Shadows:** one depth language. This site's signature is the hard offset shadow (`shadow-hard`, `shadow-hard-lg`); don't stack it with borders + soft shadows on the same element.
   - **Labels:** drop when the content is self-evident ("Name" above a name).
   - **Icons:** see above.
4. Be ruthless. It can be added back later.

## Checklist before shipping UI

- [ ] All spacing on the 8px grid; no new arbitrary `[Npx]` spacing
- [ ] All font sizes from the scale table
- [ ] Only palette tokens; accent used sparingly; contrast pairs from the table
- [ ] No emoji; icons from one set
- [ ] Every element on the component earns its place
- [ ] `AGENTS.md` accessibility checks pass
