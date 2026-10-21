# Accessibility Guide

ProblemSpot targets WCAG 2.2 AA. Accessibility is part of acceptance criteria,
not a final visual-polish step.

## Required practices

- Use semantic HTML before ARIA.
- Provide a logical heading structure and landmark regions.
- Associate every form control with a visible label.
- Make all actions operable by keyboard.
- Keep focus visible and move it deliberately after dialogs or route changes.
- Announce validation errors and status updates to assistive technology.
- Meet AA contrast requirements and never rely on color alone.
- Provide text alternatives for meaningful images and captions/transcripts for media.
- Support 200% zoom, text resizing, narrow screens, and reflow.
- Respect reduced-motion preferences.
- Use plain language for reporting, evidence, validation, and privacy choices.

## Critical workflows

Test these without a mouse:

1. Create an account and sign in.
2. Submit and edit a problem.
3. Upload or review evidence.
4. Search and filter reports.
5. Confirm experience or express support.
6. Read status history and notifications.
7. Join a mission and submit a solution proposal.
8. Review a Solution Lab artifact.

## Component expectations

- Buttons use action-oriented names.
- Links describe their destination.
- Dialogs have a name, focus trap, Escape behaviour, and focus restoration.
- Tables include headers and remain understandable on small screens.
- Maps, charts, and status timelines have equivalent text views.
- Loading indicators, empty states, and errors communicate what happens next.

## Pull-request evidence

For meaningful UI changes, document keyboard testing, automated checks used,
screen-reader verification where relevant, responsive screenshots, and any
known limitation with a follow-up issue.

