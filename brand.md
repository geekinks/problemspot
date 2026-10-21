# ProblemSpot Brand Guidelines

> **Real Community Problems. Together, Real Solutions.**

This document defines the core visual identity for ProblemSpot so the website, app, documentation, presentations, and community materials feel consistent.

## 1. Brand Essence

**ProblemSpot** is a community-powered platform for reporting real-world problems, helping people validate them, and collaborating on solutions. Its visual identity should communicate:

- **Community:** People working together to identify shared challenges.
- **Trust:** Reports and validation should feel transparent and responsible.
- **Action:** Help people move from identifying a problem to addressing it.
- **Open collaboration:** Validated problems become shared missions that people
  can investigate, design, build, test, and improve together.
- **Optimism:** Clear, approachable design that focuses on achievable progress.

### Brand personality

Modern, useful, inclusive, trustworthy, optimistic, and action-oriented.

### Tagline

**Real Community Problems. Together, Real Solutions.**

Optional short product phrase: **Report It. Validate It. Solve It.**

## 2. Logo

The ProblemSpot icon combines a green location pin, community figures, a winding path, a target ring, and a blue idea bubble. Together, these elements represent local problem discovery, collective participation, and ideas that lead to solutions.

### Logo usage

- Use the icon-only mark for the app icon, favicon, avatars, and compact navigation.
- Use the full logo lockup when introducing the brand on landing pages, presentations, and event materials.
- Prefer a white or very light neutral background for the primary logo.
- Keep the logo proportional; do not stretch, rotate, recolor, or add effects to the official artwork.
- Maintain clear space around the logo. As a practical rule, leave at least the width of one small community figure's head around the mark.
- Do not place the full-color logo on a visually busy background.
- For small sizes, use the icon-only mark and verify that its community and idea details remain legible.
- Do not recreate the logo using emoji or substitute icons.

**Asset note:** Store approved logo assets in a predictable location, such as `public/brand/`. Suggested filenames include `problemspot-icon.png`, `problemspot-logo.png`, and `problemspot-logo-dark-bg.png`. Only add files that have actually been created and approved.

## 3. Color Palette

The primary identity combines **community green** with **intelligence blue**, supported by navy and clean neutral surfaces.

### Core brand colors

| Token | Hex | Purpose |
|---|---|---|
| `brand-green` | `#168447` | Primary brand color; main buttons, active navigation, links, and positive actions |
| `brand-green-dark` | `#086B3B` | Darker green for emphasis and high-contrast states |
| `brand-green-light` | `#F0FDF4` | Soft green backgrounds and subtle highlights |
| `brand-blue` | `#2563EB` | Solution collaboration, links, insights, and informational elements |
| `brand-blue-light` | `#DBEAFE` | Background for Solution Lab or informational labels |
| `brand-navy` | `#0F172A` | Primary headings, dark surfaces, and strong text |
| `brand-slate` | `#475569` | Secondary text and supporting content |
| `brand-white` | `#FFFFFF` | Cards, text on dark surfaces, and clean space |
| `brand-background` | `#F8FAFC` | Default light page background |
| `brand-border` | `#E2E8F0` | Dividers, card borders, and input outlines |

### Status colors

Status colors communicate workflow state and must always be paired with a readable text label or icon. Do not use color alone to communicate meaning.

| Status | Text color | Background | Example use |
|---|---|---|---|
| Verified | `#166534` | `#DCFCE7` | Evidence reviewed and accepted |
| Under review | `#1D4ED8` | `#DBEAFE` | A report being reviewed |
| Needs evidence | `#92400E` | `#FEF3C7` | More context or evidence requested |
| Rejected / alert | `#991B1B` | `#FEE2E2` | Rejected report or important warning |
| In progress | `#6D28D9` | `#EDE9FE` | A solution is being worked on |
| Resolved | `#166534` | `#DCFCE7` | A solution has been marked resolved |

Use red for genuine errors, rejection, or urgent warnings—not ordinary actions or routine notifications.

### Recommended color balance

As a starting point for most screens:

- **70%** white and light neutral surfaces
- **20%** text, borders, and slate neutrals
- **10%** brand green and blue accents

Green should lead the product identity. Blue is an accent for solution
collaboration, informational elements, and the optional AI Solution Lab—not a
competing primary brand color. Avoid using large saturated green and blue areas
side by side.

## 4. Typography

Use a clean, modern sans-serif type system that remains readable across dashboards, forms, and mobile screens.

### Recommended fonts

- **Primary UI font: Inter** — for body text, navigation, forms, buttons, and dashboard content.
- **Display font: Inter** — use the same family for headings to keep the product cohesive.
- **Optional alternative: Manrope** — suitable for a slightly more distinctive, friendly marketing headline style. Use it only if the project intentionally adopts a two-font system.

**Default recommendation:** Use **Inter throughout the product**. A single font family is easier to maintain and helps the interface feel consistent.

Use a licensed or appropriately hosted font source. If the application uses `next/font/google`, configure the chosen font through Next.js rather than adding a blocking external font stylesheet.

### Type scale

| Style | Suggested size | Weight | Typical use |
|---|---:|---:|---|
| Display | `48–60px` | 700 | Landing page hero |
| H1 | `36–40px` | 700 | Main page title |
| H2 | `28–32px` | 650–700 | Major sections |
| H3 | `20–24px` | 600 | Cards and subsections |
| Body large | `18px` | 400 | Introductory copy |
| Body | `16px` | 400 | Standard reading text |
| Body small | `14px` | 400–500 | Metadata and helper text |
| Caption | `12px` minimum where appropriate | 400–500 | Compact labels and timestamps |

Use a comfortable body line height, typically around `1.5`. Avoid long passages in all caps, overly tight letter spacing, and very light font weights for essential text. Small text must remain readable on mobile.

## 5. UI Design Principles

### Layout and surfaces

- Use generous spacing and clear visual hierarchy.
- Prefer simple cards, restrained borders, and subtle shadows.
- Use rounded corners consistently; a range of `8–16px` works well for common interface elements.
- Keep content widths readable and layouts responsive.
- Make report submission and community confirmation actions easy to find.

### Buttons

- **Primary:** `#168447` background with white text.
- **Secondary:** White background with navy text and a neutral border.
- **Solution Lab action:** Use blue for optional post-validation actions such as
  “Draft solution brief,” without implying that generated output is authoritative.
- **Destructive:** Use a red treatment for actions that delete data or cause an irreversible change.

Buttons should have visible hover, focus, active, disabled, and loading states. Do not communicate an action through color alone.

### Forms and reports

- Use clear field labels, helpful descriptions, and actionable validation messages.
- Distinguish required from optional fields.
- Explain who can see a report or attached evidence before users submit sensitive information.
- Provide success, empty, loading, and error states.
- Preserve user input when a recoverable submission error occurs.

### AI Solution Lab elements

- Show Solution Lab actions only for validated problems.
- Label generated briefs, plans, issues, documentation, and code clearly.
- Use the blue accent sparingly to distinguish optional assistance.
- Explain that human review, testing, and approval are required.
- Never style generated output in a way that implies it validated the problem,
  selected the accepted solution, or proved impact.

## 6. Accessibility

Accessibility is a product requirement, not a final polish step.

- Maintain readable contrast for text and interactive elements.
- Check color combinations with an accessibility contrast checker, especially buttons, muted text, and status labels.
- Pair status colors with text or icons.
- Ensure keyboard navigation, visible focus indicators, and meaningful accessible names.
- Use semantic HTML and properly associated form labels.
- Respect reduced-motion preferences.
- Test layouts at narrow viewport widths and with browser zoom.
- Do not rely on the logo's gradients or fine details to communicate essential meaning.

## 7. Iconography and Imagery

- Prefer simple, consistent line icons; Lucide is a suitable option for the web UI.
- Use icons to support labels rather than replace important text.
- Choose authentic, context-relevant community imagery when imagery is needed and permission is available.
- Avoid imagery that stereotypes communities or exposes people in sensitive situations without consent.
- Use illustrations to clarify reporting, validation, and solution-building workflows.
- Avoid excessive gradients, glow effects, decorative animations, or unrelated stock imagery.

The official logo is more detailed than typical UI icons. Do not use the full logo in place of a small generic interface icon.

## 8. Voice and Messaging

ProblemSpot's voice should be clear, respectful, practical, and encouraging.

### Write like this

- “Report a problem”
- “I experience this too”
- “Add supporting evidence”
- “This report needs more information”
- “This validated problem is ready for open-source contributors”
- “Draft a solution brief in the AI Solution Lab”
- “Community-supported”
- “Marked as resolved”

### Avoid

- Claiming a problem is verified solely because it received many votes.
- Presenting Solution Lab output as fact or approved work without review.
- Blaming communities or individuals for complex problems.
- Overpromising outcomes or implying that every report will receive a solution.
- Using jargon when plain language is available.

## 9. Suggested CSS Tokens

These CSS custom properties can be used as a starting point. Keep the application's actual design tokens synchronized with this guide.

```css
:root {
  /* Brand */
  --ps-green: #168447;
  --ps-green-dark: #086B3B;
  --ps-green-light: #F0FDF4;
  --ps-blue: #2563EB;
  --ps-blue-light: #DBEAFE;

  /* Text and surfaces */
  --ps-navy: #0F172A;
  --ps-slate: #475569;
  --ps-white: #FFFFFF;
  --ps-background: #F8FAFC;
  --ps-border: #E2E8F0;

  /* Status */
  --ps-success-text: #166534;
  --ps-success-bg: #DCFCE7;
  --ps-info-text: #1D4ED8;
  --ps-info-bg: #DBEAFE;
  --ps-warning-text: #92400E;
  --ps-warning-bg: #FEF3C7;
  --ps-danger-text: #991B1B;
  --ps-danger-bg: #FEE2E2;

  /* Shape and typography */
  --ps-radius-sm: 8px;
  --ps-radius-md: 12px;
  --ps-radius-lg: 16px;
  --ps-font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

If Tailwind CSS and shadcn/ui are used, map these colors into the project's theme tokens rather than maintaining competing, duplicated definitions.

## 10. Brand Do's and Don'ts

### Do

- Lead with community green.
- Use blue to identify solution collaboration and optional Solution Lab actions.
- Keep interfaces calm, clear, and accessible.
- Use the approved logo assets consistently.
- Make problem status and evidence requirements transparent.
- Design for mobile and low-bandwidth contexts where practical.

### Don't

- Change logo proportions or apply unapproved colors.
- Use green to imply verification when the report is only submitted or community-supported.
- Use blue to imply that generated output is correct or approved.
- Rely only on color for status or feedback.
- Hide privacy implications for submitted reports or evidence.
- Add visual complexity that makes reporting a problem harder.

## 11. Implementation Checklist

Before a release or major UI update, check that:

- [ ] The approved logo and icon are used correctly.
- [ ] Green is the primary brand accent and blue is used selectively.
- [ ] Typography and spacing are consistent.
- [ ] Status labels include readable text, not just colored badges.
- [ ] Text and controls have appropriate contrast and keyboard focus.
- [ ] Mobile, loading, empty, error, and success states are covered.
- [ ] Solution Lab actions appear only for validated problems.
- [ ] Generated artifacts are clearly distinguished from human validation and
      approved contributor work.
- [ ] Privacy and visibility are explained at relevant points in the reporting flow.
- [ ] README and brand documentation match the implementation.

---

**ProblemSpot**  
*Real Community Problems. Together, Real Solutions.*
